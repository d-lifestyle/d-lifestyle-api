import { Request, Response } from "express";
import { User } from "model";
import { IController, IControllerRoutes, LoginProps, RegisterProps } from "types";
import { Ok, UnAuthorized } from "utils";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { AdminRoutes, ProtectRoute } from "middleware";

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
          this.routes.push({
               handler: this.UpdateProfile,
               method: "PUT",
               path: "/update-profile/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.myUsers,
               method: "GET",
               path: "/my-user",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteUserByAdmin,
               method: "DELETE",
               path: "/my-user/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
     }

     public async Register(req: Request, res: Response) {
          try {
               const { email, password, aboutInfo, contactInfo, firstName, lastName, isAdmin }: RegisterProps =
                    req.body;
               const UserExist = await User.findOne({ email: email });

               if (!email || !password || !aboutInfo || !contactInfo || !firstName || !lastName) {
                    // console.log("validation error");
                    return UnAuthorized(res, "all field is required");
               }

               if (UserExist) {
                    // console.log("user exist");
                    return UnAuthorized(res, "user is already exist with this email");
               }

               const newuser = await new User({
                    email,
                    password: bcrypt.hashSync(password, 10),
                    isAdmin: isAdmin,
                    aboutInfo,
                    contactInfo,
                    firstName,
                    lastName,
               }).save();

               return Ok(res, `${newuser.email} is successfully registered with us!`);
          } catch (err) {
               // console.log("error", err);
               return UnAuthorized(res, err);
          }
     }

     public async Login(req: Request, res: Response) {
          try {
               const { email, password }: LoginProps = req.body;
               const user = await User.findOne({ email: email });

               if (!email || !password) {
                    return UnAuthorized(res, "all field is required");
               }

               if (!user) {
                    return UnAuthorized(res, "no user found or invalid credentials");
               }

               if (!bcrypt.compareSync(password, user.password)) {
                    console.log("password error");
                    return UnAuthorized(res, "invalid credentials");
               }

               const token = jwt.sign(
                    {
                         _id: user._id,
                         email: user.email,
                    },
                    process.env.JWT_SECRET || config.get("JWT_SECRET"),
                    { expiresIn: process.env.JWT_EXPIRE || config.get("JWT_EXPIRE") }
               );
               const expiresIn = 60 * 60 * 24 * 5 * 1000;

               res.cookie("access_token", token, {
                    maxAge: expiresIn,
                    httpOnly: true,
                    signed: false,
                    secure: false,
               });
               return Ok(res, {
                    message: `${user.firstName} ${user.lastName} is logged in`,
                    token,
               });
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
               const user = await User.findById({ _id: verifyToken._id });
               return Ok(res, user);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateProfile(req: Request, res: Response) {
          try {
               await User.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                         $set: {
                              ...req.body,
                         },
                    },
                    {
                         useFindAndModify: false,
                    }
               )
                    .then((response) => {
                         return Ok(res, `${response.firstName} ${response.lastName} is updated successfully`);
                    })
                    .catch((err) => {
                         // console.log(err);
                         return UnAuthorized(res, err);
                    });
          } catch (err) {
               // console.log(err);
               return UnAuthorized(res, err);
          }
     }

     public async myUsers(req: Request, res: Response) {
          try {
               const users = await User.find().sort({
                    _id: -1,
               });
               return Ok(res, users);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteUserByAdmin(req: Request, res: Response) {
          try {
               const { deletionId } = req.params;

               const deleteUser = await User.findByIdAndDelete({ _id: deletionId });
               return Ok(res, `${deleteUser.firstName} ${deleteUser.lastName} is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
