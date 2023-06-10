import mongoose from "mongoose";
import { RentalEnquiryProps } from "types";

const RentalEnquirySchema = new mongoose.Schema<RentalEnquiryProps>(
     {
          rentalId: { type: mongoose.Schema.Types.String, required: true },
          custName: { type: mongoose.Schema.Types.String, required: true },
          custMessage: { type: mongoose.Schema.Types.String, required: true },
          custEmail: { type: mongoose.Schema.Types.String, required: true },
          custContact: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const RentalEnquiry = mongoose.model<RentalEnquiryProps>("RentalEnquiry", RentalEnquirySchema);
