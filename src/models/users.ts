import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string | null;
}

const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);