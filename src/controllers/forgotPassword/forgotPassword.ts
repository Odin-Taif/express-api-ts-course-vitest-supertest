// forgot password clicked ==> | post: email ===> check if the email in db ==> send an email with a recieve passwordLink.
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm/expressions";
import { forgotPasswordSchema } from "../../../drizzle/dbschema/zod-validations";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../../mailtrap/emailFunctions/sendPasswordResetEmail";

export const forgotPassword = async (req: Request, res: Response) => {
  const userValidated = forgotPasswordSchema.safeParse(req.body);

  if (userValidated.success) {
    try {
      // Validate request | Ask Marcus to review it and see if this is an okey error handling.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = userValidated.data;
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiresAt = new Date(
        Date.now() + 1 * 60 * 60 * 1000
      ).toISOString();
      const existingUser = await db
        .update(users)
        .set({
          resetPasswordToken: resetToken,
          resetPasswordExpiresAt: resetTokenExpiresAt,
        })
        .where(eq(users.email, email))
        .returning();

      if (!existingUser[0]) {
        return res.status(400).json({ message: "User is not in db" });
      }

      const updatedUser = existingUser[0];

      await sendPasswordResetEmail(updatedUser.email, `someurl/${resetToken}`);

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      console.log(error);
    }
  }
};
