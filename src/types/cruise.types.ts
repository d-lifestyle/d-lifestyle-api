import mongoose from "mongoose";

export interface CruisePackageProps {
     image: string;
     displayName: string;
     itinerary: string;
     sailingType: string;
     departure: {
          from: string;
          to: string;
     };
     description: string;
     SubCategory: mongoose.Schema.Types.ObjectId;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
