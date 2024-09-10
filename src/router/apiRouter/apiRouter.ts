import express from "express";
const apiRouter: express.Router = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "api router" });
});

export default apiRouter;
