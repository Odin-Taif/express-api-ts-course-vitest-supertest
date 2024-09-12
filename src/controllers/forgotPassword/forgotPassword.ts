// forgot password clicked ==> | post: email ===> check if the email in db ==> send an email with a recieve passwordLink.
import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm/expressions";
import { forgotPasswordSchema } from "../../../drizzle/dbschema/zod-validations";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";
import { generateTokenAndSetCookie } from "../../../utils/generateTokenAndSetCookie";
import { generateVerificationToken } from "../../../utils/generateVerificationToken";
import { sendVerificationEmail } from "../../../mailtrap/emails";

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
      // Check if user already exists in our db.
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length === 0) {
        return res.status(400).json({ message: "User is not in db" });
      }
    } catch (error) {}
  }
};
