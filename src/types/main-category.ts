import mongoose from "mongoose";

export interface MainCategoryProps {
     displayName: string;
     CategoryId: mongoose.Schema.Types.ObjectId[];
}
