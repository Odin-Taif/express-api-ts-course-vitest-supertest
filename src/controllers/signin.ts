import { Request, Response } from "express";
import { compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm/expressions";
import { users } from "../../drizzle/dbschema/schema";
import { db } from "../../drizzle/dbschema/db";
import { signInSchema } from "../../drizzle/dbschema/zod-validations";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie";

// -=-=-=-=-=-=-=-== login controller
export const login = async (req: Request, res: Response) => {
  const userValidated = signInSchema.safeParse(req.body);
  if (userValidated.success) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = userValidated.data;

      // || Find user by email from db through drizzle
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      // if user is not in db,  message: "User does not exist!",
      if (!existingUser.length) {
        return res.status(400).json({
          success: false,
          message: "User does not exist!",
        });
      }

      // If user exists but email is not verified, return "Please verify your email first!"
      if (!existingUser[0].verifiedEmail) {
        return res.status(400).json({
          success: false,
          message: "Please verify your email first!",
        });
      }

      // Check password
      const validPassword = compareSync(password, existingUser[0].password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect password!" });
      }

      // Generate JWT token and set it in cookies
      const token = generateTokenAndSetCookie(res, existingUser[0].id);
      // send respose
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: existingUser[0],
        token: token,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Please check your Email or Password!",
    });
  }
};
