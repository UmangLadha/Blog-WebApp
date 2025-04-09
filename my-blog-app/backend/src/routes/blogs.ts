import { Request, Response } from "express";
import { Router } from "express";
import Blogs from "../models/blogsTable";
import multer from "multer";
import expressAsyncHandler from "express-async-handler";

const blogRouter = Router();

type BlogRequestBody = {
  title: string;
  subtitle: string;
  content: string;
  likesCounts?: number;
  author: string;
};

// middelwear function for saving the image in database
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "../../uploads");
  },
  filename: function (_req, file, cb) {
    const uniqueImgName = Date.now() + "-" + file.originalname;
    cb(null, uniqueImgName);
  },
});

const upload = multer({ storage: storage });

// getting all the blogs
blogRouter.get(
  "/",
  expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const blog = await Blogs.findAll();
    res.status(200).json(blog);
  })
);

//adding the new blog in database
blogRouter.post(
  "/",
  upload.single("blogCoverImg"),
  expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, subtitle, content, likesCounts, author } =
      req.body as BlogRequestBody;

    if (!title || !subtitle || !content || !author) {
      res.status(404).json({ error: "All fields are required" });
      return;
    }
    const imageLink = req.file ? req.file.filename : null; // Get the file path
    console.log(req.body); // logging incoming body changes
    console.log("here is the img data: ", req.file); //consoling full req.file object

    await Blogs.create({
      blogTitle: title,
      blogAuthor: author,
      blogSubtitle: subtitle,
      blogImageLink: imageLink,
      blogContent: JSON.parse(content),
      blogLikesCounts: likesCounts ?? 0,
    });
    res.status(200).json({message:"blog added in database"});
  })
);

// getting the spcific blog
blogRouter.get(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const blog = await Blogs.findByPk(id);
    if (!blog) {
      res.status(404).json({message:`Blog with id ${id} not found`});
      return;
    }
    // console.log("inside id", id);
    res.status(200).json(blog);
  })
);

// updating the specific blog
blogRouter.patch(
  "/:id",
  upload.single("blogCoverImg"),
  expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, subtitle, content, likesCounts, author } =
      req.body as BlogRequestBody;
    console.log(req.body); // logging incoming body changes

    if (!title || !subtitle || !content || !author) { // Validate required fields
      res.status(404).json({ error: "All fields are required" });
      return;
    }
    const imageLink = req.file ? req.file.filename : null; // Getting the file path

    console.log("here is the img data: ", req.file); //consoling full req.file object

    // const blog = await Blogs.findByPk(id);
    const blog = await Blogs.update(
      {
        blogTitle: title,
        blogAuthor: author,
        blogSubtitle: subtitle,
        blogImageLink: imageLink,
        blogContent: JSON.parse(content),
        likesCounts: likesCounts,
      },
      { where: { blogId: id } }
    );
    res.status(200).json(blog);
  })
);

//deleting the specific blog
blogRouter.delete(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await Blogs.destroy({ where: { blogId: id } });
    res.status(200).json({ message: "Blog deleted successfully" });
  })
);

export default blogRouter;
