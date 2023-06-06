import { AccommodationProps, IController, IControllerRoutes, RentalProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Accommodation } from "model/accommodation";
import { AdminRoutes, ProtectRoute } from "middleware";
import { Rental } from "model";

export class RentalController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.GetAllRentals,
               method: "GET",
               path: "/rental",
          });
          this.routes.push({
               handler: this.GetRentalById,
               method: "GET",
               path: "/rental/:id",
          });
          this.routes.push({
               handler: this.RegisterNewRental,
               method: "POST",
               path: "/rental",
          });
          this.routes.push({
               handler: this.UpdateRentalById,
               method: "PUT",
               path: "/rental/:id",
          });
          this.routes.push({
               handler: this.DeleteRentalById,
               method: "DELETE",
               path: "/rental/:id",
          });
     }

     public async GetAllRentals(req: Request, res: Response) {
          try {
               const data = await Rental.find().populate("SubCategory").sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async GetRentalById(req: Request, res: Response) {
          try {
               const data = await Rental.findOne({ _id: req.params.id })
                    .populate("SubCategory")
                    .sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async RegisterNewRental(req: Request, res: Response) {
          try {
               const { SubCategory, carRentalName, image, location, options, peopleAllowed }: RentalProps = req.body;
               if (!SubCategory || !carRentalName || !image || !location || !options || !peopleAllowed) {
                    return UnAuthorized(res, "all field is required");
               }
               const data = await new Rental({
                    SubCategory,
                    carRentalName,
                    image,
                    location,
                    options,
                    peopleAllowed,
               }).save();
               return Ok(res, `${data.carRentalName} is uploaded`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateRentalById(req: Request, res: Response) {
          try {
               const data = await Rental.findByIdAndUpdate(
                    {
                         _id: req.params.id,
                    },
                    { $set: { ...req.body } }
               );
               return Ok(res, `${data.carRentalName} is updated`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteRentalById(req: Request, res: Response) {
          try {
               const data = await Rental.findByIdAndDelete({
                    _id: req.params.id,
               });
               return Ok(res, `${data.carRentalName} is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
