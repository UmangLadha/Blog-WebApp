const express = require("express");
const userRouter = express.Router();
const Users = require("../models/users");

// middleware
// const checkIDExist = async (req, res, next) => {
//   //console.log('Check ID exist');
//   try {
//     const { id } = req.body;
//     const count = await Users.count({ where: { id: id } });
//     if (count != 0) {
//       next();
//     }
//   } catch (error) {
// 	console.log(error);
//     res.status(400).json("User not found");
//   }
// };

// accessing the user data
userRouter.get("/", async (req, res) => {
  try {
    const user = await Users.findAll();
    res.status(200).json(user);
  } catch (error) {
	console.log(error);
    res.status(400).json({ error: "users not found database in empty" });
  }
});

//adding the new user in database
userRouter.post("/", async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    console.log(req.body); // Log incoming data
    const user = await Users.create({
      username: username,
      fullname: fullname,
      email: email,
      password: password,
    });
    res.status(200).json(`${user} added in the database`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in adding user in database" });
  }
});

// accessing the spcific user data
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = userRouter;
