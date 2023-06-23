import { Express } from "express";
import { IController } from "types";
import {
     AccommodationController,
     CarouselController,
     CategoriesController,
     HomePageController,
     SubCategoryController,
     ToDoController,
     ToursTravelController,
     AuthController,
     BlogCategoryController,
     BlogController,
     AnalysisController,
     ClientController,
     CruisePackageController,
     RentalController,
     FlightController,
} from "./controller";

const routesHandler = (express: Express, controller: IController) => {
     for (const route of controller.routes) {
          const middleware = route.middleware || [];
          switch (route.method) {
               case "GET":
                    express.get(`/api/1.0${route.path}`, ...middleware, route.handler);
                    break;
               case "POST":
                    express.post(`/api/1.0${route.path}`, ...middleware, route.handler);
                    break;
               case "PUT":
                    express.put(`/api/1.0${route.path}`, ...middleware, route.handler);
                    break;
               case "DELETE":
                    express.delete(`/api/1.0${route.path}`, ...middleware, route.handler);
                    break;
               default:
                    break;
          }
     }
};

export const registerRoutesV1 = (express: Express) => {
     routesHandler(express, new HomePageController());
     routesHandler(express, new ToDoController());
     routesHandler(express, new CategoriesController());
     routesHandler(express, new CarouselController());
     routesHandler(express, new SubCategoryController());
     routesHandler(express, new AccommodationController());
     routesHandler(express, new ToursTravelController());
     routesHandler(express, new CruisePackageController());
     routesHandler(express, new AuthController());
     routesHandler(express, new BlogCategoryController());
     routesHandler(express, new BlogController());
     routesHandler(express, new AnalysisController());
     routesHandler(express, new ClientController());
     routesHandler(express, new RentalController());
     routesHandler(express, new FlightController());
};
