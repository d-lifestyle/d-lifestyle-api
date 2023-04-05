import { HotelsProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Hotel } from "model";

export class HotelController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllHotel,
               method: "GET",
               path: "/hotel",
          });
          this.routes.push({
               handler: this.GetHotelById,
               method: "GET",
               path: "/hotel/:id",
          });
          this.routes.push({
               handler: this.UpdateHotelById,
               method: "PUT",
               path: "/hotel/:id",
          });
          this.routes.push({
               handler: this.AddNewHotel,
               method: "POST",
               path: "/hotel",
          });
          this.routes.push({
               handler: this.DeleteHotelById,
               method: "DELETE",
               path: "/hotel/:id",
          });
     }

     public async getAllHotel(req: Request, res: Response) {
          try {
               const data = await Hotel.find().sort({ createdAt: -1 }).populate("Category");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetHotelById(req: Request, res: Response) {
          try {
               const data = await Hotel.findById({ _id: req.params.id }).populate("Category");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewHotel(req: Request, res: Response) {
          try {
               const { displayName, location }: HotelsProps = req.body;
               const newHotel = await new Hotel({
                    displayName,
                    location,
               }).save();
               return Ok(res, `${newHotel.displayName} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateHotelById(req: Request, res: Response) {
          try {
               const { displayName, location }: HotelsProps = req.body;
               const updateHotel = await Hotel.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: { displayName, location } }
               );
               return Ok(res, `${updateHotel.displayName} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteHotelById(req: Request, res: Response) {
          try {
               const data = await Hotel.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
