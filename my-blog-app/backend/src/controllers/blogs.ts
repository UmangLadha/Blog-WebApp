import { Request, Response } from "express";
import Blogs from "../models/blogsTable";
import upload from "../utils/multer";

interface BlogRequestBody {
  title: string;
  subtitle: string;
  content: string;
  author: string;
}

// getting all the blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blog = await Blogs.findAll();
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in fetching blog" });
  }
};

//adding the new blog in database
export const createBlog =
  (upload.single("blogCoverImg"),
  async (req: Request, res: Response) => {
    const { title, subtitle, content, author } = req.body as BlogRequestBody;
    try {
      if (!title || !subtitle || !content || !author) {
        res.status(400);
        throw new Error("All fields are required");
      }
      ///////////////////////////////////// console.log(req.body); // logging incoming body changes
      ///////////////////////////////////// console.log("here is the img data: ", req.file); //consoling full req.file object
      const createBlog: any = {
        blogTitle: title,
        blogAuthor: author,
        blogSubtitle: subtitle,
        blogContent: JSON.parse(content),
      };
      if (req.file?.filename) {
        createBlog.blogImageLink = req.file.filename; //adding image name in createBlog object
      }
      await Blogs.create(createBlog);
      res.status(200).json({ message: "blog added in database" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error in adding blog in the database" });
    }
  });

// getting the spcific blog
export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      console.log("Blog id is invalid or not provided");
    }
    const blog = await Blogs.findOne({ where: { blogId: id } }); // fetching the blog with given id
    if (!blog) {
      res.status(404);
      throw new Error(`Blog with this ${id} not found`);
    }
    // console.log(blog);
    ////////////////////////////////////////////////////////////////////////// console.log("inside id", id);
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in fetching blog" });
  }
};

// updating the specific blog
export const updateBlog =
  (upload.single("blogCoverImg"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { title, subtitle, content, author } = req.body as BlogRequestBody;
      //////////////////////////////////////////////console.log(req.body); // logging incoming body changes
      //////////////////////////////////////////////console.log("here is the img data: ", req.file); //consoling full req.file object
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
      if (req.file?.filename) {
        updateBlogData.blogImageLink = req.file.filename;
      }
      const updatedBlog = await Blogs.update(updateBlogData, {
        where: { blogId: id },
      });
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error updating blog" });
    }
  });

//deleting the specific blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Blogs.destroy({ where: { blogId: id } });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting blog" });
  }
};
