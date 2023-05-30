import { Request, Response } from "express";
import { CarouselProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Carousel } from "model";
import { AdminRoutes, ProtectRoute } from "middleware";

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
      middleware: [ProtectRoute, AdminRoutes],
    });
    this.routes.push({
      handler: this.AddNewCarousel,
      method: "POST",
      path: "/carousel",
      middleware: [ProtectRoute, AdminRoutes],
    });
    this.routes.push({
      handler: this.DeleteCarouselById,
      method: "DELETE",
      path: "/carousel/:id",
      middleware: [ProtectRoute, AdminRoutes],
    });
  }

  public async getAllCarousel(req: Request, res: Response) {
    try {
      const data = await Carousel.find().sort({ createdAt: -1 });
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
      const { dataAlt, dataImage }: CarouselProps = req.body

      if (!dataAlt || !dataImage) {
        return UnAuthorized(res, `all field is required`)
      }

      const data = await new Carousel({ dataAlt, dataImage }).save()

      return Ok(res, `${data.dataAlt} is uploaded`)

    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async UpdateCarouselById(req: Request, res: Response) {
    try {
      const { dataAlt, dataImage }: CarouselProps = req.body;
      await Carousel.findOneAndUpdate({ _id: req.params.id }, { $set: { dataAlt, dataImage } });
      return Ok(res, `carousel is updated!`);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }

  public async DeleteCarouselById(req: Request, res: Response) {
    try {
      const data = await Carousel.findByIdAndDelete({ _id: req.params.id });
      return Ok(res, `carousel is deleted!`);
    } catch (err) {
      return UnAuthorized(res, err);
    }
  }
}
