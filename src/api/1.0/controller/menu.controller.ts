import { IController, IControllerRoutes, MenuProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Menu } from "model";

export class MenuController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllMenu,
               method: "GET",
               path: "/menu",
          });
          this.routes.push({
               handler: this.GetMenuById,
               method: "GET",
               path: "/menu/:id",
          });
          this.routes.push({
               handler: this.UpdateMenuById,
               method: "PUT",
               path: "/menu/:id",
          });
          this.routes.push({
               handler: this.AddNewMenu,
               method: "POST",
               path: "/menu",
          });
          this.routes.push({
               handler: this.DeleteMenuById,
               method: "DELETE",
               path: "/menu/:id",
          });
     }

     public async getAllMenu(req: Request, res: Response) {
          try {
               const data = await Menu.find().sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetMenuById(req: Request, res: Response) {
          try {
               const data = await Menu.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewMenu(req: Request, res: Response) {
          try {
               const { links, title }: MenuProps = req.body;
               const newCategory = await new Menu({ links, title }).save();
               return Ok(res, `${newCategory.title} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateMenuById(req: Request, res: Response) {
          try {
               const { links, title }: MenuProps = req.body;
               const updateCategory = await Menu.findOneAndUpdate({ _id: req.params.id }, { $set: { links, title } });
               return Ok(res, `${updateCategory.title} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteMenuById(req: Request, res: Response) {
          try {
               const data = await Menu.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
