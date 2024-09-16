import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm/expressions";
import { signUpSchema } from "../../drizzle/dbschema/zod-validations";
import { users } from "../../drizzle/dbschema/schema";
import { db } from "../../drizzle/dbschema/db";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie";
import { generateVerificationToken } from "../../utils/generateVerificationToken";
import { sendVerificationEmail } from "../../mailtrap/emailFunctions/sendVerificationEmail";

// -=-=-=-=-=-=- signup controller

export const signup = async (req: Request, res: Response) => {
  const userValidated = signUpSchema.safeParse(req.body);
  if (!userValidated.success) {
    return res
      .status(400)
      .json({ success: false, message: "Input not valid!" });
  }

  try {
    const { id, email, password, name } = userValidated.data;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists in our db.
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = hashSync(password, 10);
    const verificationToken = generateVerificationToken();

    // Create new user
    const newUser = await db
      .insert(users)
      .values({
        id,
        name,
        email,
        password: hashedPassword,
        verificationToken: verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .returning(); // Use `returning()` to get the inserted user back

    // Generate token and set it in the cookie
    generateTokenAndSetCookie(res, id);

    // Respond with success
    res.status(201).json({
      success: true,
      message: "An Email sent to your inbox. Please verify your email address!",
      user: newUser[0], // Drizzle returns an array, so use the first item
    });

    // Send verification email asynchronously
    sendVerificationEmail(email, verificationToken)
      .then(() => {
        console.log("Verification email sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
        // Handle the error as needed (log, notify, etc.)
      });
  } catch (error) {
    console.error(error); // Log the error to the server console
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
