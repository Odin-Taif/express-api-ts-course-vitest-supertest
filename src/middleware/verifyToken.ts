import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user!" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!);

    if (!decodedToken)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token provied" });
    // Cast req.userId to any
    (req as any).userId = (decodedToken as any).userId;
    // don't forget the next | to invoke the next meddileware
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
