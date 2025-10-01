import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;       // new field
  description: string;
  email: string;
}

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,    // make it required
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
