import { Request, Response } from "express";
import Users from "../models/userDetailsTable";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400);
      throw new Error("username or password required");
    }

    const user = await Users.findOne({
      where: {
        userName: username,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("username incorrect");
    }

    const matchPassword = await bcrypt.compare(password, user.userPassword);
    if (!matchPassword) {
      res.status(401);
      throw new Error("password incorrect");
    } else {
      res.status(200).json({
        user,
        authenticated: true,
        message: "user authenticated succesfully",
        timestampe: Date.now(),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error finding user" });
  }
};
