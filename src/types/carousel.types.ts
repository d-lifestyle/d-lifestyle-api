import * as mongoose from "mongoose";

export interface CarouselProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     Category?: mongoose.Schema.Types.ObjectId;
     title: string;
     data: CarouselDataProps[];
}

export interface NewCarouselProps {
     Category?: mongoose.Schema.Types.ObjectId;
     title: string;
     data: CarouselDataProps[];
}

export interface CarouselDataProps {
     dataImage: string;
     dataAlt: string;
}
