import mongoose from "mongoose";
import { BlogProps } from "types";

const BlogSchema = new mongoose.Schema<BlogProps>(
     {
          label: { type: mongoose.Schema.Types.String, required: true },
          images: { type: mongoose.Schema.Types.String, required: true },
          body: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Blog = mongoose.model<BlogProps>("Blog", BlogSchema);
