import { Request, Response } from "express";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";
import { eq, and, gt } from "drizzle-orm/expressions";
import { sendWelcomeEmail } from "../../../mailtrap/emailFunctions/sendWelcomeEmail";

export const verifyEmail = async (req: Request, res: Response) => {
  // Destructure the 'code' from req.body
  const { code } = req.body;
  const currentDate = new Date();
  try {
    const existingUser = await db
      .update(users)
      .set({ verifiedEmail: true })
      .where(
        and(
          eq(users.verificationToken, code),
          gt(users.verificationTokenExpiresAt, currentDate)
        )
      )
      .returning();
    if (existingUser.length > 0) {
      // Send welcome email if the update was successful
      const updatedUser = existingUser[0];
      await sendWelcomeEmail(updatedUser.email, updatedUser.name);

      res.status(200).json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({
        error: "User not found or verification code is invalid or expired",
      });
    }
  } catch (error) {
    // Handle any database query errors
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
