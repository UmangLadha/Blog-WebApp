import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import Comments from "../models/comments";

export const createComment = async (req: Request, res: Response) => {
    const { blogId, username, commentText } = req.body;
    try {
    if (!blogId || !username || !commentText ) {
      res.status(400);
      throw new Error("Value is missing");
    }
    await Comments.create({
      blogId: blogId,
      username: username,
      commentText: commentText,
    });
    const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the Comment count from the blog
    if(!blog){
      res.status(404);
      throw new Error("blog not Found");
    }
    const updateCommentCount = blog.blogCommentsCount + 1; // incrementing the Comment count
    await Blogs.update(
      {
        blogCommentsCount: updateCommentCount,
      },
      { where: { blogId: blogId } }
    );
    res.status(200).json("comment has been saved");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "error in adding the commnet into database" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  const {blogId} = req.params;
  try{
  if(!blogId){
    res.status(404);
    throw new Error("Invailed BlogId provided!");
  }
    const comments = await Comments.findAll({where:{blogId:blogId}});
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error fetching comments " });
  }
};

//deleting the specific comment
export const deleteComment =  async (req: Request, res: Response) => {
	try {
	  const { blogId } = req.params;
	  //////////////////////////////////////////////console.log(blogId);
	  Comments.destroy({where:{blogId: blogId}});
    const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the Comment count from the blog

    if(!blog){
      res.status(404);
      throw new Error("blog not Found");
    }
    const updateCommentCount = blog.blogCommentsCount - 1; // decrementing the Comment count
    await Blogs.update(
      {
        blogCommentsCount: updateCommentCount,
      },
      { where: { blogId:blogId } }
    );

	  res.status(200).json({message:`Comment deleted with this ${blogId}`});
	} catch (error) {
	  console.log(error);
	  res.status(400).json({ error: "error in deleting user" });
	}
  };