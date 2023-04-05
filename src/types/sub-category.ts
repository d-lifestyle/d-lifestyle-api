import mongoose from "mongoose";

export interface SubCategoryProps {
     name: string;
     Category: mongoose.Schema.Types.ObjectId;
     description: string;
}
