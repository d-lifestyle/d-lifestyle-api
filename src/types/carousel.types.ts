import * as mongoose from "mongoose";

export interface CarouselProps {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  dataImage: string; dataAlt: string;
}
