import * as mongoose from "mongoose";
import { AccommodationProps, ToursTravelProps } from "types";

const ToursTravelSchema = new mongoose.Schema<ToursTravelProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          code: { type: mongoose.Schema.Types.String, required: true },
          duration: { type: mongoose.Schema.Types.String, required: true },
          place: { type: mongoose.Schema.Types.String, required: true },
          theme: { type: mongoose.Schema.Types.String, required: true },
          SubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
          image: [{ type: mongoose.Schema.Types.String, required: true }],
          description: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const ToursTravel = mongoose.model("ToursTravel", ToursTravelSchema);
