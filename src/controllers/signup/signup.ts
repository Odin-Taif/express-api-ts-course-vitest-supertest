import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm/expressions";
import { signUpSchema } from "../../../drizzle/dbschema/zod-validations";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";
import { generateTokenAndSetCookie } from "../../../utils/generateTokenAndSetCookie";
import { generateVerificationToken } from "../../../utils/generateVerificationToken";
import { sendVerificationEmail } from "../../../mailtrap/emails";

// -=-=-=-=-=-=- signup controller

export const signup = async (req: Request, res: Response) => {
  const userValidated = signUpSchema.safeParse(req.body);
  if (userValidated.success) {
    try {
      // Validate request | Ask Marcus to review it and see if this is an okey error handling.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //-=-=-=-=-=-=-=-=-=-=
      const { id, email, password, name } = userValidated.data;

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
          verificationTokenExpiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ),
        })
        .returning(); // Use `returning()` to get the inserted user back

      //jwt |  generate the token and set it in the cookie.
      // this token will be used to verify the user has the correct email provided.
      generateTokenAndSetCookie(res, id);

      await sendVerificationEmail(email, verificationToken);

      // Respond with success
      res.status(201).json({
        message: "User registered successfully",
        user: newUser[0], // Drizzle returns an array, so use the first item
      });
    } catch (error) {
      console.error(error); // Log the error to the server console
      res.status(500).json({ message: "Internal Server Error" }); // Respond with a generic error message
    }
  } else {
    res.status(400).send("The input in not valid!");
  }
};
