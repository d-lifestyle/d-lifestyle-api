import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Category, MainCategory } from "model";
import { MainCategoryProps } from "types/";

export class MainCategoriesController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllMainCategories,
               method: "GET",
               path: "/main-categories",
          });
          this.routes.push({
               handler: this.GetMainCategoriesById,
               method: "GET",
               path: "/main-categories/:id",
          });
          this.routes.push({
               handler: this.UpdateMainCategoriesById,
               method: "PUT",
               path: "/main-categories/:id",
          });
          this.routes.push({
               handler: this.AddNewMainCategories,
               method: "POST",
               path: "/main-categories",
          });
          this.routes.push({
               handler: this.DeleteMainCategoriesById,
               method: "DELETE",
               path: "/main-categories/:id",
          });
     }

     public async getAllMainCategories(req: Request, res: Response) {
          try {
               const data = await MainCategory.find().populate({
                    path: "Category",
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetMainCategoriesById(req: Request, res: Response) {
          try {
               const data = await MainCategory.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewMainCategories(req: Request, res: Response) {
          try {
               const { Category, displayName }: MainCategoryProps = req.body;
               const newMainCategory = await new MainCategory({ Category, displayName }).save();
               return Ok(res, `${newMainCategory.displayName} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateMainCategoriesById(req: Request, res: Response) {
          try {
               const updateMainCategory = await MainCategory.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body }
               );
               return Ok(res, `${updateMainCategory.displayName} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteMainCategoriesById(req: Request, res: Response) {
          try {
               const data = await MainCategory.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.displayName} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
