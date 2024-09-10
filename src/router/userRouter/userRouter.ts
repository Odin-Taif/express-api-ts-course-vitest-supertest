import express from "express";
import { Request, Response } from "express";
import bcrypt, { compareSync, hashSync } from "bcryptjs";
import { body, validationResult } from "express-validator";
// import { prisma } from "../../server";
// import { login, signup } from "../../controllers/auth";
import * as jwt from "jsonwebtoken";

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
  "/register",
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
  async (req: Request, res: Response) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Check if user already exists
      // let user = await prisma.user.findFirst({ where: { email } });
      // if (user) {
      //   return res.status(400).json({ message: "User already exists!" });
      // }

      // Create new user
      // user = await prisma.user.create({
      //   data: {
      //     name,
      //     email,
      //     password: hashSync(password), // Ensure hashSync is correctly imported and used
      //   },
      // });

      // Respond with success
      // res.status(201).json({
      //   message: "User registered successfully",
      //   user,
      // });
    } catch (error) {
      console.error(error); // Log the error to the server console
      res.status(500).json({ message: "Internal Server Error" }); // Respond with a generic error message
    }
  }
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
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      // let user = await prisma.user.findFirst({ where: { email: email } });
      // if (!user) {
      //   throw Error("User does not exisit!");
      // }
      // if (!compareSync(password, user.password)) {
      //   throw Error("Incorrect password!");
      // }
      // const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!);

      // res.status(200).json({
      //   message: "user login",
      //   user: user,
      //   token: token,
      // });
    } catch (error) {
      console.log(error);
    }
  }
);

// -=-==-=-=-=-=--=-==-=-=-=-=-=-=-get user info
/*
    method: get
*/
// userRouter.get("/user", async (req, res) => {
//   res.status(200).json({ message: "user info" });
// });

export default userRouter;
