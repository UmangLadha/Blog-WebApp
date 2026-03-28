import mongoose, { Schema, Document } from "mongoose";

// interface defining the structure of User document
export interface IUser extends Document {
  userName: string;
  userFullname: string;
  userEmail: string;
  userPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userFullname: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;
