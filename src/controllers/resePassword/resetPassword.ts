// forgot password clicked ==> | post: email ===> check if the email in db ==> send an email with a recieve passwordLink.
import { Request, Response } from "express";
import { and, eq, gt } from "drizzle-orm/expressions";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";
import { hashSync } from "bcryptjs";
import { sendResetSuccessEmail } from "../../../mailtrap/emailFunctions/sendResetSuccessEmail";

export const resetPassword = async (req: Request, res: Response) => {
  const currentDate = new Date();
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashedPassword = hashSync(password, 10);

    const existingUser = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(
        and(
          eq(users.resetPasswordToken, token),
          gt(users.verificationTokenExpiresAt, currentDate)
        )
      )
      .returning();

    if (!existingUser[0]) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    const updatedUser = existingUser[0];
    await sendResetSuccessEmail(updatedUser.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};
