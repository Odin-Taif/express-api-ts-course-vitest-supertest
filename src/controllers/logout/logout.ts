import { Request, Response } from "express";
//-=-=-=-=-=-=-= Logout | removing the cookies from the res.
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Log out successfully" });
};
