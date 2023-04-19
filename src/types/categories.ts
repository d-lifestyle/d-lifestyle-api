import mongoose from "mongoose";

export interface CategoriesProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     name: string;
     parentCategory: mongoose.Schema.Types.ObjectId;
}
