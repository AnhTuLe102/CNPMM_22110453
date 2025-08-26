import mongoose, { Document, Schema } from "mongoose";

// 1. Interface cho dữ liệu User
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

// 2. Interface cho document (bao gồm mongoose Document)
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

// 3. Định nghĩa Schema
const userSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

// 4. Xuất model
const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;

