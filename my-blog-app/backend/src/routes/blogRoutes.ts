import { Router } from "express";
import { deleteBlog, updateBlog, getBlogById,getBlogs,createBlog } from "../controllers/blogs";

const blogRouter = Router();

blogRouter.post("/",createBlog);
blogRouter.get("/",getBlogs);
blogRouter.get("/:id",getBlogById);
blogRouter.patch( "/:id",updateBlog);
blogRouter.delete( "/:id",deleteBlog);

export default blogRouter;
