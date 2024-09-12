import express from "express";
import { signup } from "../../controllers/signup/signup";
import { login } from "../../controllers/signin/signin";
import { getUsers } from "../../controllers/getUsers/getUsers";
import { verifyEmail } from "../../controllers/verifyEmail/verifyEmail";
import { logout } from "../../controllers/logout/logout";

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

/*
    method: post
    form fields code
*/
userRouter.post("/verify-email", verifyEmail);

/*
    method: post

*/
userRouter.post("/logout", logout);

export default userRouter;
