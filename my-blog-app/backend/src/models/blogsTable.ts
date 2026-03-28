import mongoose, { Schema, Document } from "mongoose";

// interface defining the structure of Blog document
export interface IBlog extends Document {
  blogTitle: string;
  blogAuthor: string;
  blogSubtitle: string;
  blogImageLink: string;
  blogContent: any;
  blogLikesCount: number;
  blogCommentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    blogAuthor: { type: String, required: true },
    blogTitle: { type: String, required: true },
    blogSubtitle: { type: String, required: true },
    blogImageLink: { type: String },
    blogContent: { type: Schema.Types.Mixed, required: true },
    blogLikesCount: { type: Number, required: true, default: 0 },
    blogCommentsCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Blogs = mongoose.model<IBlog>("Blogs", blogSchema);

export default Blogs;
