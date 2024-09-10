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
userRouter.post(
  "/signup",
  [
    //-=-=-=-=-=-= Name validation
    body("name")
      .isLength({ min: 3, max: 40 })
      .not()
      .isEmpty()
      .withMessage("Name is Required!"),

    //-=-=-=-= Email Validation
    body("email").isEmail().withMessage("Correct Email is Required"),

    //-=-=-=-= Password Validation
    body("password")
      .isLength({ min: 8, max: 40 })
      .withMessage("Your password should be at least 8 characters!")
      .matches(/[A-Z]/)
      .withMessage("Your password must contain at least one uppercase letter!")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        "Your password must contain at least one special character!"
      ),
  ],
  signup
);

// -=-==-=-=-=-=--=-==-=-=-=-=--=-==-login
/*
    method: post
    form fields email | password
*/
userRouter.post(
  "/login",
  [
    //-=-=-=-= Email Validation
    body("email").isEmail().withMessage("Correct Email is Required"),

    //-=-=-=-= Password Validation
    body("password")
      .isLength({ min: 8, max: 40 })
      .withMessage("Your password should be at least 8 characters!")
      .matches(/[A-Z]/)
      .withMessage("Your password must contain at least one uppercase letter!")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        "Your password must contain at least one special character!"
      ),
  ],
  login
);

export default userRouter;
