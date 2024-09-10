import express from "express";
const eventRouter: express.Router = express.Router();

eventRouter.get("/", (req, res) => {
  res.json({ message: "events router" });
});

export default eventRouter;
