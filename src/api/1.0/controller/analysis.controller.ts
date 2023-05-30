import { Request, Response } from "express";

import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";
import config from "config";
import { MongoClient } from "mongodb";

export class AnalysisController implements IController {
  public routes: IControllerRoutes[] = [];

  constructor() {
    this.routes.push({
      handler: this.Database,
      method: "GET",
      path: "/database",
    });
  }

  public async Database(req: Request, res: Response) {
    try {
      MongoClient.connect(process.env.DB_PATH || config.get("DB_PATH"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((client) => {
          const connect = client.db("test");
          connect.listCollections().toArray(function(err, names) {
            if (err) {
              return UnAuthorized(res, err.errmsg);
            } else {
              return Ok(res, names);
            }
          });
        })
        .catch((err) => {
          // Printing the error message
          console.log(err)
          return UnAuthorized(res, err)
        });
    } catch (err) {
      console.log(err);
      return UnAuthorized(res, err);
    }
  }
}
