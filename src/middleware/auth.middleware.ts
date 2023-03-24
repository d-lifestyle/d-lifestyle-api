import { Request, Response, NextFunction } from "express";

import config from "config";
import jwt from "jsonwebtoken";
import { UnAuthorized } from "utils";

export const ProtectRoute = async (req: Request, res: Response, next: NextFunction) => {
     try {
          console.log("protect route is working");
          next();
     } catch (err) {
          return UnAuthorized(res, err.message);
     }
};
