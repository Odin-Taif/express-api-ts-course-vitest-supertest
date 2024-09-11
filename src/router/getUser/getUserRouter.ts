import express from "express";
const getUsersRouter: express.Router = express.Router();

// we a single user, a single user should only include name and email.
getUsersRouter.get("/", (req, res) => {
  res.json({ message: "api router" });
});

export default getUsersRouter;
