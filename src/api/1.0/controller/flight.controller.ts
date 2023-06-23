import { Request, Response } from "express";
import { Flight } from "model";
import { FlightProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class FlightController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.MakeFlightRequest,
               method: "POST",
               path: "/flight",
          });
          this.routes.push({
               handler: this.GetAllFlightQuery,
               method: "GET",
               path: "/flight",
          });
     }

     public async MakeFlightRequest(req: Request, res: Response) {
          try {
               const {
                    adults,
                    departure,
                    from,
                    returnDate,
                    to,
                    travelClass,
                    child,
                    infants,
                    displayName,
               }: FlightProps = req.body;

               if (
                    !adults ||
                    !departure ||
                    !from ||
                    !returnDate ||
                    !to ||
                    !travelClass ||
                    !child ||
                    !infants ||
                    !displayName
               ) {
                    return UnAuthorized(res, "all field is required");
               }

               const data = await new Flight({
                    adults,
                    departure,
                    from,
                    returnDate,
                    to,
                    travelClass,
                    child,
                    infants,
                    displayName,
               }).save();
               return Ok(res, `${data.displayName} your query received! our agent will contact you soon!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetAllFlightQuery(req: Request, res: Response) {
          try {
               const data = await Flight.find().sort({
                    createdAt: -1,
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
