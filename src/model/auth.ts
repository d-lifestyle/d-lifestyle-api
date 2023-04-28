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
     },
     {
          timestamps: true,
     }
);

export const User: mongoose.Model<RegisterProps, {}, {}> = mongoose.model<RegisterProps>("User", UserSchema);
