import { Response, Request } from "express";
import Users from "../models/userDetailsTable";
import { Op } from "sequelize";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

interface userBodyRequest{
  userName:string;
  userFullname:string;
  userEmail:string;
  userPassword:string;
}

// accessing the all user data
export const getUsers = expressAsyncHandler( async (req:Request, res:Response) => {
    const user = await Users.findAll();
    res.status(200).json(user);
});

//adding the new user data in database
export const registerUser = expressAsyncHandler(  async (req:Request, res:Response) => {
    const { userName, userFullname, userEmail, userPassword } = req.body as userBodyRequest;
    // console.log("user data recived from client:",req.body);

    if(!userName|| !userEmail||!userFullname||!userPassword){
      res.status(400);
      throw new Error("All fields are required");
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ userName: userName }, { userEmail: userEmail }], // op(operator) means checking the condition in users table where userName or userEmail is similar or not
      },
    });

    if (existingUser) {
      if (existingUser.userName === userName) {
        res.status(400);
        throw new Error(`Username "${userName}" already exists`);
      }
      if (existingUser.userEmail === userEmail) {
        res.status(400);
        throw new Error(`Email "${userEmail}" is already registered`);
      }
    }

    const hashedPassword = await bcrypt.hash(userPassword, 14);

    const user = await Users.create({
      userName: userName,
      userFullname: userFullname,
      userEmail: userEmail,
      userPassword: hashedPassword,
    });
    res
      .status(200)
      .json({ message: `${user.userName} added in the database` });
});

// accessing the spcific user data
export const getUserById = expressAsyncHandler(  async (req:Request, res:Response) => {
  const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error(`${id} not found or may be it doesnt exits`);
    }
    // console.log("inside id", id);
    const user = await Users.findByPk(id);

    if(!user){
      res.status(404);
      throw new Error("user not found");
    }
    // console.log(user);
    res.status(202).json(user);
});

//deleting the specific user
export const deleteUser = expressAsyncHandler( async (req:Request, res:Response) => {
  const { id } = req.params;
    await Users.destroy({ where: { userId: id } });
    res.status(200).json("user deleted");
});
