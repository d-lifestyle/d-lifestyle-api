import { Request, Response } from "express";
import { Cruise } from "model";
import { CruisePackageProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class CruisePackageController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.RegisterCruise,
               method: "POST",
               path: "/cruise",
          });
          this.routes.push({
               handler: this.GetCruise,
               method: "GET",
               path: "/cruise",
          });

          this.routes.push({
               handler: this.UpdateCruiseWithId,
               method: "PUT",
               path: "/cruise/:id",
          });

          this.routes.push({
               handler: this.DeleteCruiseWithId,
               method: "DELETE",
               path: "/cruise/:id",
          });

          this.routes.push({
               handler: this.GetCruiseWithId,
               method: "GET",
               path: "/cruise/:id",
          });
     }

     public async RegisterCruise(req: Request, res: Response) {
          try {
               const {
                    SubCategory,
                    departure,
                    description,
                    displayName,
                    image,
                    itinerary,
                    sailingType,
               }: CruisePackageProps = req.body;
               console.log(req.body);
               if (!SubCategory || !departure || !description || !displayName || !image || !itinerary || !sailingType) {
                    return UnAuthorized(res, "all field is required");
               }

               const data = await new Cruise({
                    SubCategory,
                    departure: {
                         from: departure.from,
                         to: departure.to,
                    },
                    description,
                    displayName,
                    image,
                    itinerary,
                    sailingType,
               }).save();

               return Ok(res, `${data.displayName} is uploaded`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetCruise(req: Request, res: Response) {
          try {
               const data = await Cruise.find().populate({
                    path: "SubCategory",
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetCruiseWithId(req: Request, res: Response) {
          try {
               const data = await Cruise.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateCruiseWithId(req: Request, res: Response) {
          try {
               const id = req.params.id;
               const data = await Cruise.findByIdAndUpdate({ _id: id }, { $set: { ...req.body } });
               return Ok(res, `${data.displayName} is updated`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteCruiseWithId(req: Request, res: Response) {
          try {
               const id = req.params.id;
               const data = await Cruise.findByIdAndDelete({ _id: id });
               return Ok(res, `${data.displayName} is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
