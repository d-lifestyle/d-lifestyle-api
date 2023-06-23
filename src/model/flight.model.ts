import mongoose from "mongoose";
import { FlightProps } from "types";

const FlightSchema = new mongoose.Schema<FlightProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          from: { type: mongoose.Schema.Types.String, required: true },
          to: { type: mongoose.Schema.Types.String, required: true },
          departure: { type: mongoose.Schema.Types.String, required: true },
          returnDate: { type: mongoose.Schema.Types.String, required: true },
          travelClass: { type: mongoose.Schema.Types.String, required: true },
          adults: { type: mongoose.Schema.Types.String, required: true },
          child: { type: mongoose.Schema.Types.String },
          infants: { type: mongoose.Schema.Types.String },
     },
     {
          timestamps: true,
     }
);

export const Flight = mongoose.model<FlightProps>("Flight", FlightSchema);
