import * as mongoose from "mongoose";
import { RentalProps } from "types";

const RentalSchema: mongoose.Schema<
     RentalProps,
     mongoose.Model<RentalProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<RentalProps>(
     {
          carRentalName: { type: mongoose.Schema.Types.String, required: true },
          image: [
               {
                    title: { type: mongoose.Schema.Types.String, required: true },
                    image: { type: mongoose.Schema.Types.String, required: true },
               },
          ],
          peopleAllowed: { type: mongoose.Schema.Types.String, required: true },
          location: {
               from: { type: mongoose.Schema.Types.String, required: true },
               to: { type: mongoose.Schema.Types.String, required: true },
          },
          options: { type: mongoose.Schema.Types.String, required: true, default: "self" },
          SubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
     },
     {
          timestamps: true,
     }
);

export const Rental: mongoose.Model<RentalProps, {}, {}> = mongoose.model<RentalProps>("Rental", RentalSchema);
