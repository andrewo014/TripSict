import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true }, 
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
export const User = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
