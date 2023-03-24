import mongoose from "mongoose";
import { MenuProps } from "types";

const MenuSchema: mongoose.Schema<
     MenuProps,
     mongoose.Model<MenuProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<MenuProps>(
     {
          title: { type: mongoose.Schema.Types.String, required: true },
          links: [
               {
                    name: { type: mongoose.Schema.Types.String, required: true },
                    path: { type: mongoose.Schema.Types.String, required: true },
               },
          ],
     },
     {
          timestamps: true,
     }
);

export const Menu: mongoose.Model<MenuProps, {}, {}> = mongoose.model<MenuProps>("Menu", MenuSchema);
