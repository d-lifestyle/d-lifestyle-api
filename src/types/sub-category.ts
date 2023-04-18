import mongoose from "mongoose";

export interface SubCategoryProps {
     name: string;
     CategoryId: mongoose.Schema.Types.ObjectId;
}
