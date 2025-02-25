const express = require("express");
const likeRouter = express.Router();
const Likes = require("../models/blogLikes");
const Blogs = require("../models/blogs");

// fetching all the likes from the table
likeRouter.get("/", async (req, res) => {
  try {
	const like = await Likes.findAll();
	res.status(200).json(like);
  } catch (error) {
	console.log(error);
	res.status(400).json({ error: "error fetching like " });
  }
});

// posting the new likes in the table
likeRouter.post("/", async (req, res) => {
  try {
    const { blogId, username } = req.body;

    await Likes.create({
      blogId: blogId,
      username: username,
    });

    const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog

    const updatelikeCount = blog.likeCounts + 1; // incrementing the like count

    await Blogs.update(
      {
        likeCounts: updatelikeCount,
      },
      { where: { blogId: blogId } }
    );

    res.status(200).json("Added the like data and updated the likecount");
  } catch (error) {
    console.log("error in liking the blog", error);
    res.status(400).json({ error: "error in liking the blog" });
  }
});

//deleting the spacific blog from the like table and reducing the like count in blog table
likeRouter.delete("/:blogId/:username", async (req, res)=>{
	try {
		const {blogId, username} = req.params;

		await Likes.destroy({ where: { blogId:blogId, username: username } });

		const blog = await Blogs.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog

		const updatelikeCount = blog.likeCounts - 1; // decrementing the like count
	
		await Blogs.update(    
		  {
			likeCounts: updatelikeCount,
		  },
		  { where: { blogId: blogId } }
		);

		res.status(200).json({message:"dislikes the blog"});
	} catch (error) {
		console.log("error in deleting the like data", error);
		res.status(400).json({error:"error in deleting the likeData"});
	}
})

module.exports = likeRouter;
