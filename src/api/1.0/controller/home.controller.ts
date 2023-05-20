import { Request, Response } from "express";
import { AdminRoutes, ProtectRoute } from "middleware";
import { ContactProps, EnquiryFormProps, IController, IControllerRoutes } from "types";
import { CategoriesProps } from "types/categories";
import { ContactFormProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Accommodation, ContactMe, Enquiry } from "model";

export class HomePageController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.Homepage,
               path: "/",
               method: "GET",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.ContactMe,
               method: "POST",
               path: "/contact-me",
          });
          this.routes.push({
               handler: this.GetContact,
               method: "GET",
               path: "/contact-me",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteContact,
               method: "DELETE",
               path: "/contact-me/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.MakeFavorite,
               method: "PUT",
               path: "/contact-me/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          // Enquiry
          this.routes.push({
               handler: this.EnquiryMe,
               method: "POST",
               path: "/enquiry",
          });
          this.routes.push({
               handler: this.GetEnquiry,
               method: "GET",
               path: "/enquiry",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.DeleteEnquiry,
               method: "DELETE",
               path: "/enquiry/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
          this.routes.push({
               handler: this.MakeEnquiryFavorite,
               method: "PUT",
               path: "/enquiry/:id",
               middleware: [ProtectRoute, AdminRoutes],
          });
     }

     public async Homepage(req: Request, res: Response) {
          try {
               const data = "Hello api is responding";
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async ContactMe(req: Request, res: Response) {
          try {
               const { body, email, name, phone, placeToVisit }: ContactFormProps = req.body;
               if (!email || !name || !phone) {
                    return UnAuthorized(res, "all field is required");
               }
               const data = await new ContactMe({
                    body,
                    email,
                    name,
                    phone,
                    placeToVisit,
               }).save();

               return Ok(res, `Thank you ${data.name}, we will reach you in short!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async GetContact(req: Request, res: Response) {
          try {
               const data = await ContactMe.find().sort({
                    createdAt: -1,
               });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async MakeFavorite(req: Request, res: Response) {
          try {
               const findData = await ContactMe.findById({ _id: req.params.id });
               const data = await ContactMe.findByIdAndUpdate(
                    { _id: findData._id },
                    { $set: { favorite: findData.favorite ? false : true } }
               );
               return Ok(
                    res,
                    findData.favorite
                         ? `${data.name} is no favorite longer to your favorite`
                         : `${data.name} is your favorite customer`
               );
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteContact(req: Request, res: Response) {
          try {
               const data = await ContactMe.findOneAndDelete({ _id: req.params.id });
               return Ok(res, `${data.name} record is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     // Enquiry
     public async EnquiryMe(req: Request, res: Response) {
          try {
               const { checkIn, checkOut, dataId, email, fullName, phone, body }: EnquiryFormProps = req.body;
               if (!email || !checkIn || !checkOut || !fullName || !dataId || !phone) {
                    console.log("data", req.body.props);
                    return UnAuthorized(res, "all field is required");
               }
               const data = await new Enquiry({
                    checkIn,
                    checkOut,
                    dataId,
                    email,
                    fullName,
                    phone,
                    body,
               }).save();
               const findData = await Accommodation.findById({ _id: dataId });

               return Ok(
                    res,
                    `Your enquiry have been received ${data.fullName} for ${findData.displayName}, our agent will contact you soon!`
               );
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async GetEnquiry(req: Request, res: Response) {
          try {
               const data = await Enquiry.find()
                    .sort({
                         createdAt: -1,
                    })
                    .populate("dataId");
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async MakeEnquiryFavorite(req: Request, res: Response) {
          try {
               const findData = await Enquiry.findById({ _id: req.params.id });
               const data = await Enquiry.findByIdAndUpdate(
                    { _id: findData._id },
                    { $set: { favorite: findData.favorite ? false : true } }
               );
               return Ok(
                    res,
                    findData.favorite
                         ? `${data.fullName} is removed from favorite`
                         : `${data.fullName} is added to favorite`
               );
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteEnquiry(req: Request, res: Response) {
          try {
               const data = await Enquiry.findOneAndDelete({ _id: req.params.id });
               return Ok(res, `${data.fullName} record is deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
