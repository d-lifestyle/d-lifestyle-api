import { Request, Response, NextFunction } from "express";

import config from "config";
import jwt from "jsonwebtoken";
import { User } from "model";
import { UnAuthorized } from "utils";

export const ProtectRoute = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const token = req.cookies.access_token;
          // if no token
          if (!token) {
               return UnAuthorized(res, "please login and try again");
          }
          // if token present than verify
          const verifyToken = jwt.verify(token, process.env.JWT_SECRET || config.get("JWT_SECRET")) as any;
          // console.log("verifying user", verifyToken);
          const user = await User.findOne({ _id: verifyToken._id });
          if (!user) {
               return UnAuthorized(res, "token is not valid");
          }
          if (!verifyToken) {
               return UnAuthorized(res, "invalid token");
          }
          // go ahead if all true
          next();
     } catch (err) {
          return UnAuthorized(res, err.message);
     }
};