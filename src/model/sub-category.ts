import mongoose from "mongoose";
import { SubCategoryProps } from "types";

const SubCategorySchema: mongoose.Schema<
     SubCategoryProps,
     mongoose.Model<SubCategoryProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<SubCategoryProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          CategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
     },
     {
          timestamps: true,
     }
);

export const SubCategory: mongoose.Model<SubCategoryProps, {}, {}> = mongoose.model<SubCategoryProps>(
     "SubCategory",
     SubCategorySchema
);
