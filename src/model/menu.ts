import mongoose from "mongoose";
import { MenuProps } from "types";

const MenuSchema: mongoose.Schema<
     MenuProps,
     mongoose.Model<MenuProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<MenuProps>(
     {
          title: { type: mongoose.Schema.Types.String, required: true, lowercase: true },
          path: { type: mongoose.Schema.Types.String, required: true, lowercase: true },
          links: [
               {
                    name: { type: mongoose.Schema.Types.String, lowercase: true },
                    path: { type: mongoose.Schema.Types.String, lowercase: true },
               },
          ],
     },
     {
          timestamps: true,
     }
);

export const Menu: mongoose.Model<MenuProps, {}, {}> = mongoose.model<MenuProps>("Menu", MenuSchema);
