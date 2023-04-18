import * as mongoose from "mongoose";
import { AccommodationProps } from "types";

const AccommodationSchema: mongoose.Schema<
     AccommodationProps,
     mongoose.Model<AccommodationProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<AccommodationProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          city: { type: mongoose.Schema.Types.String, required: true },
          state: { type: mongoose.Schema.Types.String, required: true },
          SubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
     },
     {
          timestamps: true,
     }
);

export const Accommodation: mongoose.Model<AccommodationProps, {}, {}> = mongoose.model<AccommodationProps>(
     "Accommodation",
     AccommodationSchema
);
