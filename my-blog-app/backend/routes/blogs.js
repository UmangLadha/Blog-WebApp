const express = require("express");
const blogRouter = express.Router();
const Blogs = require("../models/blogs");
const { where } = require("sequelize");

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
blogRouter.post("/", async (req, res) => {
  try {
    const { title, subtitle, imageLink, content, likesCounts, comments , author} =
      req.body;
    console.log(req.body); // log incoming changes
    const blog = await Blogs.create({
      title: title,
      subtitle: subtitle,
      imageLink: imageLink,
      content: content,
	  author: author,
      likesCounts: likesCounts,
      comments: comments,
    });
    res.status(200).json(`${blog} blog added in the database`);
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
    const { title, subtitle, imageLink, content, likesCounts, comments, author } = req.body;
    if (!id) {
      res.status(400).json(`${id} not found may be it doesnt exits`);
    }
    // const blog = await Blogs.findByPk(id);
    const blog = await Blogs.update(
      {
        title: title,
        subtitle: subtitle,
        imageLink: imageLink,
        content: content,
		likesCounts: likesCounts,
		comments: comments,
		author:author
      },
      { where: { blogId: id } }
    );
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
