import { Response } from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY!;

export const generateTokenAndSetCookie = (res: Response, userId: any) => {
  const token = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
