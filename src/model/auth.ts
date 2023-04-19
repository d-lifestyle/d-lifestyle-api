import mongoose from "mongoose";
import { LoginProps } from "types/";

const UserSchema: mongoose.Schema<
     LoginProps,
     mongoose.Model<LoginProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<LoginProps>(
     {
          email: { type: mongoose.Schema.Types.String, required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          isAdmin: { type: mongoose.Schema.Types.Boolean, required: true },
     },
     {
          timestamps: true,
     }
);

export const User: mongoose.Model<LoginProps, {}, {}> = mongoose.model<LoginProps>("User", UserSchema);
