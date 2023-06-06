import * as mongoose from "mongoose";
import { CruisePackageProps } from "types";

const CruisePackageSchema: mongoose.Schema<
     CruisePackageProps,
     mongoose.Model<CruisePackageProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<CruisePackageProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          image: { type: mongoose.Schema.Types.String, required: true },
          itinerary: { type: mongoose.Schema.Types.String, required: true },
          sailingType: { type: mongoose.Schema.Types.String, required: true },
          departure: {
               from: { type: mongoose.Schema.Types.String, required: true },
               to: { type: mongoose.Schema.Types.String, required: true },
          },
          description: { type: mongoose.Schema.Types.String, required: true },
          SubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
     },
     {
          timestamps: true,
     }
);

export const Cruise: mongoose.Model<CruisePackageProps, {}, {}> = mongoose.model<CruisePackageProps>(
     "Cruise",
     CruisePackageSchema
);
