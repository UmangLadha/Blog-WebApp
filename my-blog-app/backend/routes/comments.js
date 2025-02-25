const express = require("express");
const commentRouter = express.Router();
const Comments = require("../models/comments");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId, username, commentText } = req.body;
    await Comments.create({
      blogId: blogId,
      username: username,
      commentText: commentText,
    });
    res.status(200).json("comment has been saved");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "error in adding the commnet into database" });
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const comments = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error fetching comments " });
  }
});

//deleting the specific comment
commentRouter.delete("/:blogId", async (req, res) => {
	try {
	  const { id } = req.body;
	  console.log(id);
	  Comments.destroy({where:{id: id}});
	  res.status(200).json(`Comment deleted with this Id`);
	} catch (error) {
	  console.log(error);
	  res.status(400).json({ error: "error in deleting user" });
	}
  });

module.exports = commentRouter;