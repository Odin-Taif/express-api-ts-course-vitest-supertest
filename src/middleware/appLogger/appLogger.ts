import express from "express";

let appLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // track url , time, data
  let url = req.url;
  let method = req.method;
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let result: string = `[${url}] [${method}] [${date}] [${time}]`;
  // console.log(result);
  next(); // this is one is really important to carry on to the next middleware.
};

export default appLogger;
