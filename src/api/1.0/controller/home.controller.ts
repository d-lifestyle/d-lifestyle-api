import { Link } from "db";
import { Request, Response } from "express";
import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class HomePageController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.Homepage,
               path: "/",
               method: "GET",
          });
     }

     public async Homepage(req: Request, res: Response) {
          try {
               const data = Link;
               return Ok(res, data);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err);
          }
     }
}
