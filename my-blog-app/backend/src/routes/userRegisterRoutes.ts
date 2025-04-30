import { Router } from "express";
import { getUsers, registerUser, deleteUser, getUserById } from "../controllers/signupRoute";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", registerUser);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUser);

export default userRouter;