import { Request, Response } from "express";
import { AdminRoutes, ProtectRoute } from "middleware";
import { BlogCategory } from "model";
import { BlogCategoryProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class BlogCategoryController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.GetBlogCategory,
               method: "GET",
               path: "/blog-category",
          });
          this.routes.push({
               handler: this.GetBlogCategoryById,
               method: "GET",
               path: "/blog-category/:id",
          });
          this.routes.push({
               handler: this.RegisterBlogCategory,
               method: "POST",
               path: "/blog-category",
               middleware: [ProtectRoute, AdminRoutes],
          });

          this.routes.push({
               handler: this.UpdateBlogCategory,
               method: "PUT",
               path: "/blog-category/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteBlogCategory,
               method: "DELETE",
               path: "/blog-category/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
     }

     public async GetBlogCategory(req: Request, res: Response) {
          try {
               const data = await BlogCategory.find();
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetBlogCategoryById(req: Request, res: Response) {
          try {
               const data = await BlogCategory.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async RegisterBlogCategory(req: Request, res: Response) {
          try {
               const { images, label }: BlogCategoryProps = req.body;
               const data = await new BlogCategory({ images, label }).save();
               return Ok(res, `${data.label} is created`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateBlogCategory(req: Request, res: Response) {
          try {
               const data = await BlogCategory.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
               return Ok(res, `${data.label} is updated`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteBlogCategory(req: Request, res: Response) {
          try {
               const data = await BlogCategory.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.label} is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
