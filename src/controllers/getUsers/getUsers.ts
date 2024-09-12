import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { users } from "../../../drizzle/dbschema/schema";
import { db } from "../../../drizzle/dbschema/db";

// -=-=-=-=-=-=- signup controller

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Validate request | Ask Marcus to review it and see if this is an okey error handling.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existingUsers = await db
      .select({
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);

    // Respond with success
    res.status(200).json({
      message: "Users fetched successfully",
      users: existingUsers, // Drizzle returns an array, so use the first item
    });
  } catch (error) {
    console.error(error); // Log the error to the server console
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a generic error message
  }
};
