const express = require("express");
const loginRouter = express.Router();
const Users = require("../models/users");

loginRouter.post("/", async (req, res)=>{
	try {
		const { username, password } = req.body;
		const user = await Users.findOne({where:{
			username: username,
			password: password
		}})
		if(!user){
			console.log(error);
			res.status(401).json({error:"username or password incorrect"})
		}
		else{
			res.status(200).json({
				user,
				authenticated: true,
				message: "user authenticated succesfully",
				timestampe: Date.now(),
			})
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({error: "error finding user"})
	}
})

module.exports = loginRouter;