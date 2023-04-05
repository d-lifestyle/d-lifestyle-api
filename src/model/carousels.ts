import mongoose from "mongoose";
import { CarouselProps } from "types";

const CarouselSchema: mongoose.Schema<
     CarouselProps,
     mongoose.Model<CarouselProps, any, any>,
     undefined,
     {}
> = new mongoose.Schema<CarouselProps>({
     title: { type: mongoose.Schema.Types.String, required: true },
     Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
     data: [
          {
               dataImage: { type: mongoose.Schema.Types.String, required: true },
               dataAlt: { type: mongoose.Schema.Types.String, required: true },
          },
     ],
});

export const Carousel: mongoose.Model<CarouselProps, {}, {}> = mongoose.model<CarouselProps>(
     "Carousel",
     CarouselSchema
);
