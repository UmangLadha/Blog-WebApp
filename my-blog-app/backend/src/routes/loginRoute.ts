import { Router } from "express";
import { loginUser } from "../controllers/loginRoute";

const loginRouter = Router();

loginRouter.post("/",loginUser);

export default loginRouter;