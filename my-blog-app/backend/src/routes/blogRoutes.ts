import { Router } from "express";
import { deleteBlog, updateBlog, getBlogById,getBlogs,createBlog } from "../controllers/blogs";

const blogRouter = Router();

blogRouter.post("/",createBlog);
blogRouter.get("/",getBlogs);
blogRouter.get("/:blogId",getBlogById);
blogRouter.patch( "/:blogId",updateBlog);
blogRouter.delete( "/:blogId",deleteBlog);

export default blogRouter;
