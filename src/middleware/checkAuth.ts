import { NextFunction, Request, Response } from "express";
import { db } from "../../drizzle/dbschema/db";
import { users } from "../../drizzle/dbschema/schema";
import { eq } from "drizzle-orm/expressions";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdFromReq = req.userId as any;

    const existingUser = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userIdFromReq));

    // If no user found, return error
    if (!existingUser[0]) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    // Send the user data in the response
    res.status(200).json({
      success: true,
      user: {
        id: existingUser[0].id,
        name: existingUser[0].name,
        email: existingUser[0].email,
      },
    });
  } catch (error) {
    console.log("Error in checkAuth", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
