import express from "express";
import { signup } from "../../controllers/signup/signup";
import { login } from "../../controllers/signin/signin";
import { getUsers } from "../../controllers/getUsers/getUsers";
import { verifyEmail } from "../../controllers/verifyEmail/verifyEmail";
import { logout } from "../../controllers/logout/logout";
import { forgotPassword } from "../../controllers/forgotPassword/forgotPassword";
import { resetPassword } from "../../controllers/resetPassword/resetPassword";
import { verifyToken } from "../../middleware/verifyToken";
import { checkAuth } from "../../middleware/checkAuth";

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
    // It is protucted route 


*/
userRouter.get("/protucted-route", verifyToken, checkAuth);

export default userRouter;
