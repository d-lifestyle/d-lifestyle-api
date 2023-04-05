import { Request, Response } from "express";

import { CarouselProps, IController, IControllerRoutes, NewCarouselProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Carousel } from "model";

export class CarouselController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllCarousel,
               method: "GET",
               path: "/carousel",
          });
          this.routes.push({
               handler: this.GetCarouselById,
               method: "GET",
               path: "/carousel/:id",
          });
          this.routes.push({
               handler: this.UpdateCarouselById,
               method: "PUT",
               path: "/carousel/:id",
          });
          this.routes.push({
               handler: this.AddNewCarousel,
               method: "POST",
               path: "/carousel",
          });
          this.routes.push({
               handler: this.DeleteCarouselById,
               method: "DELETE",
               path: "/carousel/:id",
          });
     }

     public async getAllCarousel(req: Request, res: Response) {
          try {
               const data = await Carousel.find().sort({ createdAt: -1 }).populate("Category", "name description");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetCarouselById(req: Request, res: Response) {
          try {
               const data = await Carousel.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewCarousel(req: Request, res: Response) {
          try {
               const { data, title, Category }: NewCarouselProps = req.body;
               const newCarousel = await new Carousel({ data, title, Category }).save();
               return Ok(res, `${newCarousel.title} carousel is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateCarouselById(req: Request, res: Response) {
          try {
               const { data, title, Category }: CarouselProps = req.body;
               const updateCarousel = await Carousel.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: { data, title, Category } }
               );
               return Ok(res, `${updateCarousel.title} carousel is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteCarouselById(req: Request, res: Response) {
          try {
               const data = await Carousel.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.title} carousel is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
