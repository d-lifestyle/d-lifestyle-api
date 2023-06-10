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

export interface RentalEnquiryProps {
     rentalId: string;
     custName: string;
     custMessage: string;
     custEmail: string;
     custContact: string;
}
