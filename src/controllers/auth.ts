import { Request, Response } from "express";
// import { prisma } from "../server";
import { hashSync, compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";
import { db } from "../dbschema/db"; // Your Drizzle db instance
import { users } from "../dbschema/schema"; // The users schema definition from Drizzle
import { eq } from "drizzle-orm/expressions";
import { signUpSchema, signInSchema } from "../dbschema/zod-validations";

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
      const { email, password, name } = userValidated.data;

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

      // Create new user
      const newUser = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returning(); // Use `returning()` to get the inserted user back

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
    res.status(400).send("Please check your Email or Password!");
  }
};
