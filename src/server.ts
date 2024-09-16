import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./router/userRouter/userRouter";

const app = express();

app.use(cors());

// express configuration to receive form data
app.use(express.json());
app.use(cookieParser());

const hostname: string = "localhost";

const port: number = 3000;

// middlerware configuration | make sure that the middlewares are placed before the routes.

//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome from express with TS, Vitest and supertest" });
});

//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
// app listening on
app.listen(3000, "0.0.0.0", () => {
  console.log(`express server is started at http://${hostname}:${port}`);
});

export default app;
