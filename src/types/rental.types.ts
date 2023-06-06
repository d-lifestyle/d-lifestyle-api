import * as mongoose from "mongoose";

export interface RentalProps {
     _id?: string;
     createdAt?: string;
     updateAt?: string;
     carRentalName: string;
     image: {
          title: string;
          image: string;
     }[];
     peopleAllowed: string;
     location: {
          from: string;
          to: string;
     };
     options: "self" | "driver" | "chauffeur";
     SubCategory: mongoose.Schema.Types.ObjectId;
}
