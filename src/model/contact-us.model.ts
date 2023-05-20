import mongoose from "mongoose";
import { ContactFormProps } from "types/general.types";

const ContactFormSchema = new mongoose.Schema<ContactFormProps>(
     {
          name: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          phone: { type: mongoose.Schema.Types.String, required: true },
          placeToVisit: { type: mongoose.Schema.Types.String },
          body: { type: mongoose.Schema.Types.String },
          favorite: { type: mongoose.Schema.Types.Boolean, required: true, default: false },
     },
     {
          timestamps: true,
     }
);

export const ContactMe = mongoose.model<ContactFormProps>("ContactMe", ContactFormSchema);
