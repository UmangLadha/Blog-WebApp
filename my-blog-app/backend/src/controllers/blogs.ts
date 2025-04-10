import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Blogs from "../models/blogsTable";
import upload from "../utils/multer";

interface BlogRequestBody {
  title: string;
  subtitle: string;
  content: string;
  author: string;
};

// getting all the blogs
export const getBlogs =  expressAsyncHandler(async (req: Request, res: Response) => {
    const blog = await Blogs.findAll();
    res.status(200).json(blog);
  });

//adding the new blog in database
export const createBlog =  (upload.single("blogCoverImg"),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { title, subtitle, content, author } = req.body as BlogRequestBody;

    if (!title || !subtitle || !content || !author) {
      res.status(400);
      throw new Error("All fields are required");
    }
    ///////////////////////////////////// console.log(req.body); // logging incoming body changes
    ///////////////////////////////////// console.log("here is the img data: ", req.file); //consoling full req.file object
    const createBlog:any = {
      blogTitle: title,
      blogAuthor: author,
      blogSubtitle: subtitle,
      blogContent: JSON.parse(content),
    }
    if(req.file?.filename){
      createBlog.blogImageLink = req.file.filename;
    }
    await Blogs.create(createBlog);
    res.status(200).json({ message: "blog added in database" });
  })
);

// getting the spcific blog
export const getBlogById =
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await Blogs.findByPk(id); // fetching the blog with given id
    if (!blog) {
      res.status(404);
      throw new Error(`Blog with this ${id} not found`);
    }
    ////////////////////////////////////////////////////////////////////////// console.log("inside id", id);
    res.status(200).json(blog);
  });

// updating the specific blog
export const updateBlog =  (
  upload.single("blogCoverImg"),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, subtitle, content, author } = req.body as BlogRequestBody;
    //////////////////////////////////////////////console.log(req.body); // logging incoming body changes
    //////////////////////////////////////////////console.log("here is the img data: ", req.file); //consoling full req.file object
    // Validating required fields
    if (!title || !subtitle || !content || !author) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const updateBlogData:any = {
      blogTitle: title,
      blogAuthor: author,
      blogSubtitle: subtitle,
      blogContent: JSON.parse(content),
    }
    if(req.file?.filename){
      updateBlogData.blogImageLink = req.file.filename;
    }
    const updatedBlog = await Blogs.update(
        updateBlogData,
      { where: { blogId: id } }
    );
    res.status(200).json(updatedBlog);
  })
);

//deleting the specific blog
export const deleteBlog = 
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Blogs.destroy({ where: { blogId: id } });
    res.status(200).json({ message: "Blog deleted successfully" });
  });

