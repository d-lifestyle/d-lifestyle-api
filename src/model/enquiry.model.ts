import mongoose from "mongoose";
import { EnquiryFormProps } from "types";

const EnquirySchema = new mongoose.Schema<EnquiryFormProps>(
     {
          dataId: { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation", required: true },
          checkIn: { type: mongoose.Schema.Types.String, required: true },
          checkOut: { type: mongoose.Schema.Types.String, required: true },
          fullName: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          phone: { type: mongoose.Schema.Types.String, required: true },
          body: { type: mongoose.Schema.Types.String },
          favorite: { type: mongoose.Schema.Types.Boolean, default: false },
     },
     {
          timestamps: true,
     }
);

export const Enquiry = mongoose.model<EnquiryFormProps>("Enquiry", EnquirySchema);
