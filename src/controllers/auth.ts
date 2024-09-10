import { Request, Response } from "express";
import { prisma } from "../server";
import { hashSync, compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;
    let user = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
      throw Error("user already exists!");
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password),
      },
    });
    res.status(200).json({
      message: "user registered",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      throw Error("User does not exisit!");
    }
    if (!compareSync(password, user.password)) {
      throw Error("Incorrect password!");
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET!);

    res.status(200).json({
      message: "user login",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
