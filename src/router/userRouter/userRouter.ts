import express, { Request, Response } from "express";
import { body } from "express-validator";
import { login, signup } from "../../controllers/auth";
const userRouter: express.Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "route is working" });
});

// -=-==-=-=-=-=--=-==-=-=-=-=--=-=-=-register
/*
    method: post
    form fields  name | email | password
*/
userRouter.post("/signup", signup);

// -=-==-=-=-=-=--=-==-=-=-=-=--=-==-login
/*
    method: post
    form fields email | password
*/
userRouter.post("/login", login);

export default userRouter;
