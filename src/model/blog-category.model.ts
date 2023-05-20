import mongoose from "mongoose";
import { BlogCategoryProps } from "types";

const BlogCategorySchema = new mongoose.Schema<BlogCategoryProps>(
     {
          label: { type: mongoose.Schema.Types.String, required: true },
          images: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const BlogCategory = mongoose.model<BlogCategoryProps>("BlogCategory", BlogCategorySchema);
