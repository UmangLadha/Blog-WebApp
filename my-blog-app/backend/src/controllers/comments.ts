import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import Comments from "../models/comments";

export const createComment = async (req: Request, res: Response) => {
  const { blogId, username, commentText } = req.body;
  try {
    if (!blogId || !username || !commentText) {
      res.status(400);
      throw new Error("Value is missing");
    }
    const newComment = new Comments({
      blogId: blogId,
      username: username,
      commentText: commentText,
    });
    await newComment.save();

    // incrementing the comment count in the blog
    await Blogs.findByIdAndUpdate(blogId, { $inc: { blogCommentsCount: 1 } });

    res.status(200).json("comment has been saved");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "error in adding the commnet into database" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    if (!blogId) {
      res.status(404);
      throw new Error("Invailed BlogId provided!");
    }
    const comments = await Comments.find({ blogId: blogId });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error fetching comments " });
  }
};

//deleting the specific comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    await Comments.deleteMany({ blogId: blogId });

    // decrementing the comment count in the blog
    await Blogs.findByIdAndUpdate(blogId, { $inc: { blogCommentsCount: -1 } });

    res.status(200).json({ message: `Comment deleted with this ${blogId}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting user" });
  }
};