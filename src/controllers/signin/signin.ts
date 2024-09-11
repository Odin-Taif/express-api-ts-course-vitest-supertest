import { Request, Response } from "express";
// import { prisma } from "../server";
import { compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";

import { eq } from "drizzle-orm/expressions";
import { users } from "../../../dbschema/schema";
import { db } from "../../../dbschema/db";
import { signInSchema } from "../../../dbschema/zod-validations";

// -=-=-=-=-=-=- signup controller

// -=-=-=-=-=-=-=-== login controller
export const login = async (req: Request, res: Response) => {
  const userValidated = signInSchema.safeParse(req.body);
  if (userValidated.success) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = userValidated.data;

      // Find user by email
      const user = await db.select().from(users).where(eq(users.email, email));

      if (user.length === 0) {
        return res.status(400).json({ message: "User does not exist!" });
      }

      // Check password
      const validPassword = compareSync(password, user[0].password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY!, {
        expiresIn: "1h", // Set token expiration time as needed
      });

      res.status(200).json({
        message: "User logged in successfully",
        user: user[0], // Drizzle returns an array, so use the first item
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Please check your Email or Password!" });
  }
};
