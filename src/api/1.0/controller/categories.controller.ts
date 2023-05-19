import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Category, MainCategory } from "model";
import { CategoriesProps } from "types/categories";
import { AdminRoutes, ProtectRoute } from "middleware";
import mongoose from "mongoose";

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
               const data = await Category.find().populate({
                    path: "parentCategory",
               });
               // .sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetCategoriesById(req: Request, res: Response) {
          try {
               const data = await Category.findById({ _id: req.params.id }).populate("parentCategory");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewCategories(req: Request, res: Response) {
          try {
               const { name, parentCategory }: CategoriesProps = req.body;
               const newCategory = await new Category({ name, parentCategory }).save();
               return Ok(res, `${newCategory.name} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateCategoriesById(req: Request, res: Response) {
          try {
               const updateCategory = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
               return Ok(res, `${updateCategory.name} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteCategoriesById(req: Request, res: Response) {
          try {
               const data = await Category.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.name} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
