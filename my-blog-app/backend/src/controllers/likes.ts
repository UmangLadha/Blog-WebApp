import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Blogs from "../models/blogsTable";
import Likes from "../models/blogLikesTable";

// fetching all the likes from the table
export const getLikes = expressAsyncHandler(async (req: Request, res: Response) => {
    const like = await Likes.findAll();
    res.status(200).json(like);
});

// posting the new likes in the table
export const createLike = expressAsyncHandler(async (req: Request, res: Response) => {
    const { blogId, username } = req.body;

    if (!blogId || !username) {
      res.status(400);
      throw new Error("Both blogId and username are required");
    }

    await Likes.create({
      blogId: blogId,
      username: username,
    });

    const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog

    if (!blog) {
      throw new Error("Blog not Found");
    }

    const updatedLikeCount = blog.blogLikesCount + 1; // incrementing the like count

    await Blogs.update(
      {
        blogLikesCount: updatedLikeCount,
      },
      { where: { blogId: blogId } }
    );

    res.status(200).json("Added the like data and updated the likecount");
});

//deleting the spacific blog from the like table and reducing the like count in blog table
export const deleteLike = expressAsyncHandler(async (req: Request, res: Response) => {
    const { blogId, username } = req.params;

    if (!blogId || !username) {
      res.status(400);
      throw new Error("Both blogId and username are required");
    }

    await Likes.destroy({ where: { blogId: blogId, username: username } });

    const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog

    if (!blog) {
      res.status(404);
      throw new Error("blog not Found");
    }

    const updatedLikeCount = blog.blogLikesCount - 1; // decrementing the like count

    await Blogs.update(
      {
        blogLikesCount: updatedLikeCount,
      },
      { where: { blogId: blogId } }
    );

    res.status(200).json({ message: "dislikes the blog" });
});
