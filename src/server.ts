import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import userRouter from "./router/userRouter/userRouter";
//import appLogger from "./middleware/appLogger/appLogger";
import apiRouter from "./router/apiRouter/apiRouter";
import eventRouter from "./router/eventRouter/eventRouter";
import { PrismaClient } from "@prisma/client";

const app = express();
//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
//configure cors
app.use(cors());

//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
// express configuration to receive form data
app.use(express.json());

// configure prisma

export const prisma = new PrismaClient({
  log: ["query"],
});

// define the hostname
const hostname: string = "localhost";
// define the port number
const port: number = 3000;
//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
// middlerware configuration | make sure that the middlewares are placed before the routes.
// app.use(appLogger);

//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
// // router config
app.use("/api", apiRouter);
app.use("/events", eventRouter);
app.use("/users", userRouter);

//-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=
app.get("/", (req: express.Request, res: express.Response) => {
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
