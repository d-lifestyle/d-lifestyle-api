import mongoose from "mongoose";
import { MainCategoryProps } from "types";

const MainCategorySchema: mongoose.Schema<
     MainCategoryProps,
     mongoose.Model<MainCategoryProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<MainCategoryProps>(
     {
          displayName: { type: mongoose.Schema.Types.String, required: true },
          CategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
     },
     {
          timestamps: true,
     }
);

export const MainCategory: mongoose.Model<MainCategoryProps, {}, {}> = mongoose.model<MainCategoryProps>(
     "MainCategory",
     MainCategorySchema
);
