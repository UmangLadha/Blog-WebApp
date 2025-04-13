import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import Likes from "../models/blogLikesTable";

// fetching all the likes from the table
export const getLikes = async (req: Request, res: Response) => {
  const {blogId} = req.params;
  if(!blogId){
    throw new Error("Invaild blogId!");
  }
  try {
    const like = await Likes.findAll({where:{blogId : blogId}});
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
  } catch (error) {
    console.log("error in liking the blog", error);
    res.status(400).json({ error: "error in liking the blog" });
  }
};

//deleting the spacific blog from the like table and reducing the like count in blog table
export const deleteLike = async (req: Request, res: Response) => {
  const { blogId, username } = req.params;
  try {
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
  } catch (error) {
    console.log("error in deleting the like data", error);
    res.status(400).json({ error: "error in deleting the likeData" });
  }
};
