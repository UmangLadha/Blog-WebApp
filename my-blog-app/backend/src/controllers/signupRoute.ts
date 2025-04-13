import { Response, Request } from "express";
import Users from "../models/userDetailsTable";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

interface userBodyRequest {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

// accessing the all user data
export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await Users.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "users not found in database" });
  }
};

//adding the new user data in database
export const registerUser = async (req: Request, res: Response) => {
  const { username, fullname, email, password } = req.body as userBodyRequest;
  // console.log("user data recived from client:",req.body);
  try {
    if (!username || !email || !fullname || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ userName: username }, { userEmail: email }], // op(operator) means checking the condition in users table where userName or userEmail is similar or not
      },
    });

    if (existingUser) {
      if (existingUser.userName === username) {
        res.status(400);
        throw new Error(`Username "${username}" already exists`);
      }
      if (existingUser.userEmail === email) {
        res.status(400);
        throw new Error(`Email "${email}" is already registered`);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = await Users.create({
      userName: username,
      userFullname: fullname,
      userEmail: email,
      userPassword: hashedPassword,
    });
    res.status(200).json({ message: `${user.userName} added in the database` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in adding user in database" });
  }
};

// accessing the spcific user data
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400);
      throw new Error(`${id} not found or may be it doesnt exits`);
    }
    // console.log("inside id", id);
    const user = await Users.findByPk(id);

    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }
    // console.log(user);
    res.status(202).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(` ${id} user not found in the database`);
  }
};

//deleting the specific user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Users.destroy({ where: { userId: id } });
    res.status(200).json("user deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleting user" });
  }
};
