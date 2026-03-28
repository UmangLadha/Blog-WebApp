import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import Likes from "../models/blogLikesTable";

// fetching all the likes from the table
export const getLikes = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  if (!blogId) {
    throw new Error("Invaild blogId!");
  }
  try {
    const like = await Likes.find({ blogId: blogId });
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error fetching like " });
  }
};

// posting the new likes in the table
export const createLike = async (req: Request, res: Response) => {
  const { blogId, username } = req.body;
  try {
    if (!blogId || !username) {
      res.status(400);
      throw new Error("Both blogId and username are required");
    }

    const newLike = new Likes({
      blogId: blogId,
      username: username,
    });
    await newLike.save();

    // incrementing the like count in the blog
    await Blogs.findByIdAndUpdate(blogId, { $inc: { blogLikesCount: 1 } });

    res.status(200).json("Added the like data and updated the likecount");
  } catch (error) {
    console.log("error in liking the blog", error);
    res.status(400).json({ error: "error in liking the blog" });
  }
};

//deleting the specific blog from the like table and reducing the like count in blog table
export const deleteLike = async (req: Request, res: Response) => {
  const { blogId, username } = req.params;
  try {
    if (!blogId || !username) {
      res.status(400);
      throw new Error("Both blogId and username are required");
    }

    await Likes.deleteOne({ blogId: blogId, username: username });

    // decrementing the like count in the blog
    await Blogs.findByIdAndUpdate(blogId, { $inc: { blogLikesCount: -1 } });

    res.status(200).json({ message: "dislikes the blog" });
  } catch (error) {
    console.log("error in deleting the like data", error);
    res.status(400).json({ error: "error in deleting the likeData" });
  }
};
