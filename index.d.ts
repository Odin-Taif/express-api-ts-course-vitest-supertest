// types/express/index.d.ts

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string; // Add your custom field here
  }
}
