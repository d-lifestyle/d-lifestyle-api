import * as Mongoose from "mongoose";

export interface AccommodationProps {
     displayName: string;
     city: string;
     state: string;
     SubCategory: Mongoose.Schema.Types.ObjectId;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface ToursTravelProps {
     displayName: string;
     code: string;
     duration: string;
     place: string;
     theme: string;
     SubCategory: Mongoose.Schema.Types.ObjectId;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
