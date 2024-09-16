import express from "express";
import {
  signup,
  login,
  getUsers,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} from "../../controllers/index";
import { verifyToken, checkAuth } from "../../middleware/index";

const userRouter: express.Router = express.Router();

/*

    get all users in our db
*/
userRouter.get("/", getUsers);

/*
    method: post
    form fields  name | email | password
*/
userRouter.post("/signup", signup);

/*

    form fields email | password
*/
userRouter.post("/login", login);

/*
    // will be deleting the cookies 
*/
userRouter.post("/logout", logout);

/*

    input : the code sent to the email reciepent
*/
userRouter.post("/verify-email", verifyEmail);

/*

    input: email

*/
userRouter.post("/forgot-password", forgotPassword);

/*

    input : new password
    // a Token from the req.params of the -=-=-=| forgot-password route into -=-==-=|reset-password req.pramas  

*/
userRouter.post("/reset-password/:token", resetPassword);

/*
 method: get
 meddileware method | verifyToken: to verify the token in cookies | checkAuth to check if the user exists in the db

*/
userRouter.get("/protected-route", verifyToken, checkAuth);

export default userRouter;
