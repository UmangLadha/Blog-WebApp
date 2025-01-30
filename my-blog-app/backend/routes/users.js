const express = require("express");
const userRouter = express.Router();
const Users = require("../models/users");

// accessing the user data
userRouter.get("/", async (req, res) => {
  try {
    const user = await Users.findAll();
    res.status(200).json(user);
  } catch (error) {
	console.log(error);
    res.status(400).json({ error: "users not found in database" });
  }
});

//adding the new user in database
userRouter.post("/", async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    console.log(req.body); // Log incoming data
	if(username === Users.username){
		res.status(400).json({message:`this ${username} already exist please write other username`});
	}
	else if(email === Users.email){
		res.status(400).json({message: `this ${email} already resigterd try with other email`});
	}
	else{
		const user = await Users.create({
			username: username,
			fullname: fullname,
			email: email,
			password: password,
		});
		res.status(200).json({message: `${user.username} added in the database`});
	}
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in adding user in database" });
  }
});

// accessing the spcific user data
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.body;
	if (!id) {
		res.status(400).json(`${id} not found or may be it doesnt exits`);
	  }
    console.log("inside id", id);
    const user = await Users.findByPk(id);
	console.log(user); 
    res.status(202).json(user);
  } catch (error) {
	console.log(error);
    res.status(400).json(` ${id} user not found in the database`);
  }
});

//deleting the specific user
userRouter.delete("/:id", async (req, res) => {
	try {
	  const { id } = req.params;
	  Users.destroy({ where: { userId: id } });
	  res.status(200).json("user deleted");
	} catch (error) {
	  console.log(error);
	  res.status(400).json({ error: "error in deleting user" });
	}
  });

module.exports = userRouter;
