import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import fs from "fs";
import path from "path";

interface BlogRequestBody {
  title: string;
  subtitle: string;
  content: string;
  author: string;
  blogImageLink:string;
}

// getting all the blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blog = await Blogs.findAll();
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in fetching blog" });
  }
};

//adding the new blog in database
export const createBlog = async (req: Request, res: Response) => {
    const { title, subtitle, content, author, blogImageLink } = req.body as BlogRequestBody;
    try {
      if (!title || !subtitle || !content || !author || !blogImageLink) {
        res.status(400).json({message:"All fields are required"});
        return;
      }

      const removeFilePrefix =  blogImageLink.replace(/^data:.*;base64,/,"");
      const fileBuffer = Buffer.from(removeFilePrefix, "base64");
      const fileName = `blog-img-${Date.now()}.jpg`;
      const imagePath = path.join(__dirname ,"../../uploads", fileName);
      fs.writeFileSync(imagePath, fileBuffer);

      const createBlog: any = {
        blogTitle: title,
        blogAuthor: author,
        blogSubtitle: subtitle,
        blogContent: JSON.parse(content),
        blogImageLink: fileName
      };
      await Blogs.create(createBlog);
      res.status(200).json({ message: "blog added in database" });
    } catch (error) {
      console.log("Error in creating blog:",error);
      res.status(400).json({ message: "error in adding blog in the database" });
    }
  };

// getting the spcific blog
export const getBlogById = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    if (!blogId) {
      res.status(400).json({message:"Blog id is invalid or not provided"});
      return;
    }
    const blog = await Blogs.findOne({ where: { blogId: blogId } }); // fetching the blog with given blogId
    if (!blog) {
      res.status(404).json({message:`Blog with this ${blogId} not found`});
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in fetching blog" });
  }
};

// updating the specific blog
export const updateBlog =
  async (req: Request, res: Response) => {
    const { blogId } = req.params;
    try {
      const { title, subtitle, content, author } = req.body as BlogRequestBody;
      // Validating required fields
      if (!title || !subtitle || !content || !author) {
        res.status(400);
        throw new Error("All fields are required");
      }
      const updateBlogData: any = {
        blogTitle: title,
        blogAuthor: author,
        blogSubtitle: subtitle,
        blogContent: JSON.parse(content),
      };
      const updatedBlog = await Blogs.update(updateBlogData, {
        where: { blogId: blogId },
      });
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error updating blog" });
    }
  };

//deleting the specific blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    await Blogs.destroy({ where: { blogId: blogId } });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting blog" });
  }
};
