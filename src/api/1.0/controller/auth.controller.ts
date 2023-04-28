import { Request, Response } from "express";
import { User } from "model";
import { IController, IControllerRoutes, LoginProps, RegisterProps } from "types";
import { Ok, UnAuthorized } from "utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { ProtectRoute } from "middleware";

export class AuthController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.Login,
               method: "POST",
               path: "/login",
          });
          this.routes.push({
               handler: this.Register,
               method: "POST",
               path: "/register",
          });
          this.routes.push({
               handler: this.Logout,
               method: "POST",
               path: "/logout",
               middleware: [ProtectRoute],
          });
          this.routes.push({
               handler: this.Profile,
               method: "GET",
               path: "/profile",
               middleware: [ProtectRoute],
          });
     }

     public async Register(req: Request, res: Response) {
          try {
               const { email, password }: LoginProps = req.body;
               const UserExist = await User.findOne({ email: email });
               const hashedPassword = bcrypt.hashSync(password, 10);

               if (!email || !password) {
                    return UnAuthorized(res, "all field is required");
               }

               if (UserExist) {
                    return UnAuthorized(res, "user is already exist with this email");
               }

               const newuser = await new User({
                    email,
                    password: hashedPassword,
                    isAdmin: false,
               }).save();

               return Ok(res, `${newuser.email} is successfully registered with us!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async Login(req: Request, res: Response) {
          try {
               const { email, password }: LoginProps = req.body;
               const user = await User.findOne({ email: email }).select("email password isAdmin");

               if (!email || !password) {
                    return UnAuthorized(res, "all field is required");
               }

               if (!user) {
                    return UnAuthorized(res, "no user found or invalid credentials");
               }

               if (!bcrypt.compareSync(password, user.password)) {
                    // console.log("password error");
                    return UnAuthorized(res, "invalid credentials");
               }

               const token = jwt.sign(
                    {
                         _id: user._id,
                         email: user.email,
                         password: user.password,
                         isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET || config.get("JWT_SECRET"),
                    { expiresIn: process.env.JWT_EXPIRE || config.get("JWT_EXPIRE") }
               );

               res.cookie("access_token", token, {
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true,
                    // secure: process.env.NODE_ENV === "development",
               });

               return Ok(res, { user, token });
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async Logout(req: Request, res: Response) {
          try {
               res.clearCookie("access_token");
               return Ok(res, "Logged out successfully");
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async Profile(req: Request, res: Response) {
          try {
               const token = req.cookies.access_token;
               const verifyToken = jwt.verify(token, process.env.JWT_SECRET || config.get("JWT_SECRET")) as any;
               const user = await User.findById({ _id: verifyToken._id }).select("email password isAdmin");

               return Ok(res, user);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
