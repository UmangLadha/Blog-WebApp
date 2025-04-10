import { Router } from "express";
import {deleteComment,createComment,getComment} from "../controllers/comments";

const commentRouter = Router();

commentRouter.post("/",getComment);
commentRouter.get("/",createComment);
commentRouter.delete("/:blogId",deleteComment);

export default commentRouter;