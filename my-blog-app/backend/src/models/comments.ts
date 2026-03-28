import mongoose, { Schema, Document } from "mongoose";

// interface defining the structure of Comment document
export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  username: string;
  commentText: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "Blogs", required: true },
    username: { type: String, required: true },
    commentText: { type: String, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Comments = mongoose.model<IComment>("Comments", commentSchema);

export default Comments;
