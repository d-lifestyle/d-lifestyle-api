import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Category } from "model";
import { CategoriesProps } from "types/categories";
import { AdminRoutes, ProtectRoute } from "middleware";

export class CategoriesController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllCategories,
               method: "GET",
               path: "/categories",
          });
          this.routes.push({
               handler: this.GetCategoriesById,
               method: "GET",
               path: "/categories/:id",
          });
          this.routes.push({
               handler: this.UpdateCategoriesById,
               method: "PUT",
               path: "/categories/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.AddNewCategories,
               method: "POST",
               path: "/categories",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteCategoriesById,
               method: "DELETE",
               path: "/categories/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
     }

     public async getAllCategories(req: Request, res: Response) {
          try {
               const data = await Category.find();
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetCategoriesById(req: Request, res: Response) {
          try {
               const data = await Category.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewCategories(req: Request, res: Response) {
          try {
               const { displayName }: CategoriesProps = req.body;
               const newCategory = await new Category({ displayName }).save();
               return Ok(res, `${newCategory.displayName} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateCategoriesById(req: Request, res: Response) {
          try {
               const updateCategory = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
               return Ok(res, `${updateCategory.displayName} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteCategoriesById(req: Request, res: Response) {
          try {
               const data = await Category.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.displayName} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
