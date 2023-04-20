import { IController, IControllerRoutes, ToursTravelProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { ToursTravel } from "model";
import { ProtectRoute } from "middleware";

export class ToursTravelController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllToursTravel,
               method: "GET",
               path: "/tours-travel",
          });
          this.routes.push({
               handler: this.GetToursTravelById,
               method: "GET",
               path: "/tours-travel/:id",
          });
          this.routes.push({
               handler: this.UpdateToursTravelById,
               method: "PUT",
               path: "/tours-travel/:id",
          });
          this.routes.push({
               handler: this.AddNewToursTravel,
               method: "POST",
               path: "/tours-travel",
          });
          this.routes.push({
               handler: this.DeleteToursTravelById,
               method: "DELETE",
               path: "/tours-travel/:id",
          });
     }

     public async getAllToursTravel(req: Request, res: Response) {
          try {
               const data = await ToursTravel.find().populate({
                    path: "SubCategory",
                    select: "name",
                    populate: { path: "CategoryId", select: "name" },
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetToursTravelById(req: Request, res: Response) {
          try {
               const data = await ToursTravel.findById({ _id: req.params.id }).populate({
                    path: "SubCategory",
                    select: "name",
                    populate: { path: "CategoryId", select: "name" },
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewToursTravel(req: Request, res: Response) {
          try {
               const { code, displayName, duration, place, theme, SubCategory }: ToursTravelProps = req.body;
               const newToursTravel = await new ToursTravel({
                    code,
                    displayName,
                    duration,
                    place,
                    theme,
                    SubCategory,
               }).save();
               return Ok(res, `${newToursTravel.displayName} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateToursTravelById(req: Request, res: Response) {
          try {
               const UpdateToursTravel = await ToursTravel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
               return Ok(res, `${UpdateToursTravel.displayName} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteToursTravelById(req: Request, res: Response) {
          try {
               const data = await ToursTravel.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data.displayName} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
