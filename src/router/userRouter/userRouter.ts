import express from "express";
import {
  signup,
  login,
  getUsers,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} from "../../controllers/Controllers|=|";
import { verifyToken, checkAuth } from "../../middleware/Middleware|=|";

const userRouter: express.Router = express.Router();

/*
    method: get
    get all users in our db
*/
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

/*
    method: post
    // will be deleting the cookies 
*/
userRouter.post("/logout", logout);

/*
    method: post
    input : the code sent to the email reciepent
*/
userRouter.post("/verify-email", verifyEmail);

/*
    method: post
    input: email

*/
userRouter.post("/forgot-password", forgotPassword);

/*
    method: post
    // reseting the password to a new password.
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
