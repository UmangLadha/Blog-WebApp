const express = require("express");
const userRouter = express.Router();
const UserTable = require("../models/userDetailsTable");
const { Op } = require('sequelize');

// accessing the all user data
userRouter.get("/", async (req, res) => {
  try {
    const user = await UserTable.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "users not found in database" });
  }
});

//adding the new user data in database
userRouter.post("/", async (req, res) => {
  try {
    const { userName, userFullname, userEmail, userPassword } = req.body;
    console.log("user data recived from client:",req.body);

    // const findingExistingUser = await UserTable.findOne({
    //   where: {
    //     [Op.or]: [{ userName: userName }, { userEmail: userEmail }], // op(operator) means checking the condition in users table where userName or userEmail is similar or not
    //   },
    // });

    // if (findingExistingUser) {
    //   if (userName === findingExistingUser.userName) {
    //     res.status(400).json({
    //       message: `This ${userName} already exist please write other userName`,
    //     });
    //   }
    //   if (userEmail === findingExistingUser.userEmail) {
    //     res.status(400).json({
    //       message: `This ${userEmail} already registerd try with other userEmail`,
    //     });
    //   }
    // }
    const user = await UserTable.create({
      userName: userName,
      userFullname: userFullname,
      userEmail: userEmail,
      userPassword: userPassword,
    });
    res
      .status(200)
      .json({ message: `${user.userName} added in the database` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in adding user in database" });
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
    const user = await UserTable.findByPk(id);
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
    UserTable.destroy({ where: { userId: id } });
    res.status(200).json("user deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting user" });
  }
});

export default userRouter;
