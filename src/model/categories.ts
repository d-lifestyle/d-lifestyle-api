import mongoose from "mongoose";
import { CategoriesProps } from "types/categories";

const CategorySchema: mongoose.Schema<
     CategoriesProps,
     mongoose.Model<CategoriesProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<CategoriesProps>(
     {
          name: { type: mongoose.Schema.Types.String, required: true },
          description: { type: mongoose.Schema.Types.String },
     },
     {
          timestamps: true,
     }
);

export const Category: mongoose.Model<CategoriesProps, {}, {}> = mongoose.model<CategoriesProps>(
     "Category",
     CategorySchema
);
