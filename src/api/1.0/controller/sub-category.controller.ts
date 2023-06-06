import { IController, IControllerRoutes, SubCategoryProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { SubCategory } from "model";
import { AdminRoutes, ProtectRoute } from "middleware";

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
      middleware: [ProtectRoute, AdminRoutes],
    });
    this.routes.push({
      handler: this.DeleteSubCategoryById,
      method: "DELETE",
      path: "/sub-category/:id",
      middleware: [ProtectRoute, AdminRoutes],
    });

    this.routes.push({
      handler: this.GetSubCategoryByCategoryId,
      method: "GET",
      path: "/sub-category/category/:id",
    });
  }

  public async getAllSubCategory(req: Request, res: Response) {
    try {
      const data = await SubCategory.find().populate({
        path: "CategoryId",
        populate: { path: "parentCategory" },
      });
      return Ok(res, data);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async GetSubCategoryById(req: Request, res: Response) {
    try {
      const data = await SubCategory.findById({ _id: req.params.id }).populate("CategoryId");
      return Ok(res, data);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async AddNewSubCategory(req: Request, res: Response) {
    try {
      const { CategoryId, displayName }: SubCategoryProps = req.body;
      const newCategory = await new SubCategory({ CategoryId, displayName }).save();
      return Ok(res, `${newCategory.displayName} is created!`);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async UpdateSubCategoryById(req: Request, res: Response) {
    try {
      const { CategoryId, displayName }: SubCategoryProps = req.body;
      const updateCategory = await SubCategory.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { CategoryId, displayName } }
      );
      return Ok(res, `${updateCategory.displayName} is updated!`);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async DeleteSubCategoryById(req: Request, res: Response) {
    try {
      const data = await SubCategory.findByIdAndDelete({ _id: req.params.id });
      return Ok(res, `${data.displayName} is deleted!`);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async GetSubCategoryByCategoryId(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const data = await SubCategory.find({ CategoryId: id as any }).populate({
        path: "CategoryId",
        populate: { path: "parentCategory", },
      })
      return Ok(res, data);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }
}
