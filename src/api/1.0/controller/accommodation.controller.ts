import { AccommodationProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Accommodation } from "model/accommodation";
import { AdminRoutes, ProtectRoute } from "middleware";

export class AccommodationController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllAccommodation,
               method: "GET",
               path: "/accommodation",
          });
          this.routes.push({
               handler: this.GetAccommodationById,
               method: "GET",
               path: "/accommodation/:id",
          });
          this.routes.push({
               handler: this.UpdateAccommodationById,
               method: "PUT",
               path: "/accommodation/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.AddNewAccommodation,
               method: "POST",
               path: "/accommodation",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteAccommodationById,
               method: "DELETE",
               path: "/accommodation/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
     }

     public async getAllAccommodation(req: Request, res: Response) {
          try {
               const data = await Accommodation.find().populate("SubCategory").sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetAccommodationById(req: Request, res: Response) {
          try {
               const data = await Accommodation.findById({ _id: req.params.id }).populate({
                    path: "SubCategory",
                    select: "displayName",
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewAccommodation(req: Request, res: Response) {
          try {
               const { city, displayName, state, SubCategory, description, image }: AccommodationProps = req.body;
               const newAccommodation = await new Accommodation({
                    city,
                    displayName,
                    state,
                    SubCategory,
                    description,
                    image,
               }).save();
               return Ok(res, `${newAccommodation.displayName} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateAccommodationById(req: Request, res: Response) {
          try {
               const UpdateAccommodation = await Accommodation.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body }
               );
               return Ok(res, `${UpdateAccommodation.displayName} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteAccommodationById(req: Request, res: Response) {
          try {
               const data = await Accommodation.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.displayName} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
