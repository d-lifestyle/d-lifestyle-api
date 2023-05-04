import mongoose from "mongoose";
import { LoginProps, RegisterProps } from "types/";

const UserSchema: mongoose.Schema<
     RegisterProps,
     mongoose.Model<RegisterProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<RegisterProps>(
     {
          email: { type: mongoose.Schema.Types.String, required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          isAdmin: { type: mongoose.Schema.Types.Boolean, default: false, required: true },
          firstName: { type: mongoose.Schema.Types.String, required: true },
          lastName: { type: mongoose.Schema.Types.String, required: true },
          contactInfo: {
               address: { type: mongoose.Schema.Types.String, required: true },
               phone: { type: mongoose.Schema.Types.String, required: true },
               instaLink: { type: mongoose.Schema.Types.String },
               fbLink: { type: mongoose.Schema.Types.String },
          },
          aboutInfo: {
               aboutText: { type: mongoose.Schema.Types.String, required: true },
               logo: { type: mongoose.Schema.Types.String, required: true },
               slogan: { type: mongoose.Schema.Types.String },
               termsCondition: { type: mongoose.Schema.Types.String, required: true },
               privacyPolicy: { type: mongoose.Schema.Types.String, required: true },
               support: { type: mongoose.Schema.Types.String },
          },
     },
     {
          timestamps: true,
     }
);

export const User: mongoose.Model<RegisterProps, {}, {}> = mongoose.model<RegisterProps>("User", UserSchema);
