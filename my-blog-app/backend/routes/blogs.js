const express = require("express");
const blogRouter = express.Router();
const Blogs = require("../models/blogs");

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
    const { title, subtitle, imageLink, content } = req.body;
    console.log(req.body); // log incoming changes
    const blog = await Blogs.create({
      title: title,
      subtitle: subtitle,
      imageLink: imageLink,
      content: content,
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
    console.log("inside id", id);
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
	const { id, title, subtitle, imageLink, content } = req.body;
    if (!id) {
      res.status(400).json(`${id} not found may be it doesnt exits`);
    }
    const blog = await Blogs.findByPk(id);
    blog.update({
      title: title,
      subtitle: subtitle,
      imageLink: imageLink,
      content: content,
    });
    res.status(200).json(blog);
  } catch (error) {
	console.log(error);
    res.status(400).json({ error: "error updating blog" });
  }
});

//deleting the specific blog
// blogRouter.delete('/:id', [checkIDExist], (req,res)=>{
// 	try {
// 		const { id } = req.params;
// 		const blog = await Blogs.findone({where:{
// id:id// }});
// 		blog.destroy();
// 		res.status(200).noContent();
// 	} catch (error) {
// 		res.status(400).json({error:"error in deleting blog"})
// 	}
// })

module.exports = blogRouter;
