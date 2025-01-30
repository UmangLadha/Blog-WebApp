const express = require("express");
const blogRouter = express.Router();
const Blogs = require("../models/blogs");
const multer = require("multer");

// middelwear function for saving the image in database
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueImgName = Date.now() + "-" + file.originalname;
    cb(null, uniqueImgName);
  },
});

// error checking for multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Acceptable file types
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error("Invalid file type!"));
  },
});

// accessing the blog data
blogRouter.get("/", async (req, res) => {
  try {
    const blog = await Blogs.findAll();
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in fetching blog" });
  }
});

//adding the new blog in database
blogRouter.post("/", upload.single("blogCoverImg"), async (req, res) => {
  try {
    const { title, subtitle, content, likesCounts, author } = req.body;

    if (!title || !subtitle || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageLink = req.file ? req.file.filename : null; // Get the file path

    console.log(req.body); // logging incoming body changes
    console.log("here is the img data: ", req.file); //consoling full req.file object

    const blog = await Blogs.create({
      title: title,
      subtitle: subtitle,
      imageLink: imageLink,
      content: JSON.parse(content),
      author: author,
      likesCounts: likesCounts,
    });
    res.status(200).json(`${blog.title} blog added in the database`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in adding blog in the database" });
  }
});

// accessing the spcific blog data
blogRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json(`${id} not found may be it doesnt exits`);
    }
    // console.log("inside id", id);
    const blog = await Blogs.findByPk(id);
    res.status(202).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in fetching blog" });
  }
});

// updating the specific blog data
blogRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageLink, content, likesCounts, author } =
      req.body;
    // Validate required fields
    if (!title || !subtitle || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // const blog = await Blogs.findByPk(id);
    const blog = await Blogs.update(
      {
        title: title,
        subtitle: subtitle,
        imageLink: imageLink,
        content: JSON.parse(content),
        likesCounts: likesCounts,
        author: author,
      },
      { where: { blogId: id } }
    );

    if (!id) {
      res.status(400).json(`${id} not found may be it doesnt exits`);
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error updating blog" });
  }
});

//deleting the specific blog
blogRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Blogs.destroy({ where: { blogId: id } });
    res.status(200).json("blog deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting blog" });
  }
});

module.exports = blogRouter;
