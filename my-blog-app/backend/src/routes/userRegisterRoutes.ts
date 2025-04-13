import { Router } from "express";
import { registerUser, getUserById, getUsers, deleteUser } from "../controllers/signupRoute";

const userRouter = Router();

userRouter.get("/",getUsers);
userRouter.post("/",registerUser);
userRouter.get("/:id",getUserById);
userRouter.delete("/:id",deleteUser);

export default userRouter;