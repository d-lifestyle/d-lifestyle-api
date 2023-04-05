import mongoose from "mongoose";
import { HotelsProps } from "types";

const HotelSchema: mongoose.Schema<
     HotelsProps,
     mongoose.Model<HotelsProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<HotelsProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          location: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Hotel: mongoose.Model<HotelsProps, {}, {}> = mongoose.model<HotelsProps>("Hotel", HotelSchema);
