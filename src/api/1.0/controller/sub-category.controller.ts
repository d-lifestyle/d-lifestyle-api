import { IController, IControllerRoutes, SubCategoryProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { SubCategory } from "model";

export class SubCategoryController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllSubCategory,
               method: "GET",
               path: "/sub-category",
          });
          this.routes.push({
               handler: this.GetSubCategoryById,
               method: "GET",
               path: "/sub-category/:id",
          });
          this.routes.push({
               handler: this.UpdateSubCategoryById,
               method: "PUT",
               path: "/sub-category/:id",
          });
          this.routes.push({
               handler: this.AddNewSubCategory,
               method: "POST",
               path: "/sub-category",
          });
          this.routes.push({
               handler: this.DeleteSubCategoryById,
               method: "DELETE",
               path: "/sub-category/:id",
          });
     }

     public async getAllSubCategory(req: Request, res: Response) {
          try {
               const data = await SubCategory.find().sort({ createdAt: -1 }).populate("Category");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetSubCategoryById(req: Request, res: Response) {
          try {
               const data = await SubCategory.findById({ _id: req.params.id }).populate("Category");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewSubCategory(req: Request, res: Response) {
          try {
               const { Category, description, name }: SubCategoryProps = req.body;
               const newCategory = await new SubCategory({ Category, description, name }).save();
               return Ok(res, `${newCategory.name} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateSubCategoryById(req: Request, res: Response) {
          try {
               const { Category, description, name }: SubCategoryProps = req.body;
               const updateCategory = await SubCategory.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: { Category, description, name } }
               );
               return Ok(res, `${updateCategory.name} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteSubCategoryById(req: Request, res: Response) {
          try {
               const data = await SubCategory.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
