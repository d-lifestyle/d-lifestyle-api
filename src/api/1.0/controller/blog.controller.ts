import { Request, Response } from "express";
import { AdminRoutes, ProtectRoute } from "middleware";
import { Blog } from "model";
import { BlogProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class BlogController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.GetAllBlogs,
               method: "GET",
               path: "/blogs",
          });

          this.routes.push({
               handler: this.GetBlogsById,
               method: "GET",
               path: "/blogs/:id",
          });
          this.routes.push({
               handler: this.RegisterNewBlog,
               method: "POST",
               path: "/blogs",
          });
          this.routes.push({
               handler: this.UpdateBlogById,
               method: "PUT",
               path: "/blogs/:id",
          });
          this.routes.push({
               handler: this.DeleteBlogById,
               method: "DELETE",
               path: "/blogs/:id",
          });
     }
     public async GetAllBlogs(req: Request, res: Response) {
          try {
               const data = await Blog.find();
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetBlogsById(req: Request, res: Response) {
          try {
               const data = await Blog.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async RegisterNewBlog(req: Request, res: Response) {
          try {
               const { body, images, label }: BlogProps = req.body;
               const data = await new Blog({
                    body,
                    images,
                    label,
               }).save();
               return Ok(res, `${data.label} is uploaded`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async UpdateBlogById(req: Request, res: Response) {
          try {
               const data = await Blog.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
               return Ok(res, `${data.label} is updated`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteBlogById(req: Request, res: Response) {
          try {
               const data = await Blog.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.label} is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
