import mongoose from "mongoose";
import { TodoProps } from "types";

const TodoSchema = new mongoose.Schema<TodoProps>(
     {
          title: { type: mongoose.Schema.Types.String, required: true },
          task: { type: mongoose.Schema.Types.Boolean, required: true },
     },
     {
          timestamps: true,
     }
);

export const Todo = mongoose.model<TodoProps>("Todo", TodoSchema);
