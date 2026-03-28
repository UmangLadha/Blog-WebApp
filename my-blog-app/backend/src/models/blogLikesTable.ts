import mongoose, { Schema, Document } from "mongoose";

// interface defining the structure of Like document
export interface ILike extends Document {
  blogId: mongoose.Types.ObjectId;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new Schema<ILike>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "Blogs", required: true },
    username: { type: String, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Likes = mongoose.model<ILike>("Likes", likeSchema);

export default Likes;
