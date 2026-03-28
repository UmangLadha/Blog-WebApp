import { Response, Request } from "express";
import Users from "../models/userDetailsTable";
import bcrypt from "bcrypt";

interface UserBodyRequest {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

// accessing the all user data
export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in fetching users:", error);
    res.status(400).json({ message: "users not found in database" });
  }
};

//adding the new user data in database
export const registerUser = async (req: Request, res: Response) => {
  const { username, fullname, email, password } = req.body as UserBodyRequest;
  try {
    if (!username || !email || !fullname || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // checking if username or email already exists
    const existingUser = await Users.findOne({
      $or: [{ userName: username }, { userEmail: email }],
    });

    if (existingUser) {
      if (existingUser.userName === username) {
        res.status(400).json({ message: `Username "${username}" already exists` });
        return;
      }
      if (existingUser.userEmail === email) {
        res.status(400).json({ message: `Email "${email}" is already registered` });
        return;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = new Users({
      userName: username,
      userFullname: fullname,
      userEmail: email,
      userPassword: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: `${user.userName} added in the database` });
  } catch (error) {
    console.log("Error in registering user:", error);
    res.status(400).json({ message: "error in adding user in database" });
  }
};

// accessing the specific user data
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: `${id} not found or may be it doesnt exits` });
      return;
    }
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getting user:", error);
    res.status(400).json({ message: `${id} user not found in the database` });
  }
};

//deleting the specific user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log("Error in deleting user:", error);
    res.status(400).json({ error: "error in deleting user" });
  }
};
