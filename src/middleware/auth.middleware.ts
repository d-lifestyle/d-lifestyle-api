import { Request, Response, NextFunction } from "express";

import config from "config";
import jwt from "jsonwebtoken";
import { User } from "model";
import { Forbidden, UnAuthorized } from "utils";
import moment from "moment";

export const ProtectRoute = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const token = req.cookies.access_token;
          // if no token
          if (!token) {
               return UnAuthorized(res, "please login and try again");
          }
          // if token present than verify
          const verifyToken = jwt.verify(token, process.env.JWT_SECRET || config.get("JWT_SECRET")) as any;

          const currentTime = moment().format("DD/MM/YYYY hh:mm:ss");
          const expTime = moment(verifyToken.exp).format("DD/MM/YYY hh:mm");
          // console.log("exp timer", expTime, "current timer", currentTime);
          if (currentTime >= expTime) {
               return Forbidden(res, "session expire please login again");
          }

          const user = await User.findById({ _id: verifyToken._id });
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

export const AdminRoutes = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const token = req.cookies.access_token;
          if (!token) {
               UnAuthorized(res, "please login and try again");
          }
          const verifyToken = jwt.verify(token, process.env.JWT_SECRET || config.get("JWT_SECRET")) as any;
          const user = await User.findById({ _id: verifyToken._id });
          if (!user.isAdmin) {
               return UnAuthorized(res, "you are not allowed to accessing this page");
          }
          next();
     } catch (err) {
          return UnAuthorized(res, err);
     }
};
