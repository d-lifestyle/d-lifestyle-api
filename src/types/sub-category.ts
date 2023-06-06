import mongoose from "mongoose";

export interface SubCategoryProps {
     displayName: string;
     CategoryId: mongoose.Schema.Types.ObjectId;
}
