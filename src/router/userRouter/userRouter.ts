import express, { Request, Response } from "express";
import { signup } from "../../controllers/signup/signup";
import { login } from "../../controllers/signin/signin";
import { getUsers } from "../../controllers/getUsers/getUsers";

const userRouter: express.Router = express.Router();

userRouter.get("/", getUsers);

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
