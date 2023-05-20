import mongoose from "mongoose";

export interface ContactFormProps {
     name: string;
     email: string;
     phone: string;
     placeToVisit?: string;
     body?: string;
     favorite: boolean;
}

export interface EnquiryFormProps {
     dataId: mongoose.Schema.Types.ObjectId;
     checkIn: string;
     checkOut: string;
     fullName: string;
     email: string;
     phone: string;
     body?: string;
     favorite?: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
