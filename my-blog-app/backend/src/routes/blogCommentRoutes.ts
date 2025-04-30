import { Router } from "express";
import {deleteComment,createComment,getComment} from "../controllers/comments";

const commentRouter = Router();

commentRouter.post("/",createComment);
commentRouter.get("/:blogId",getComment);
commentRouter.delete("/:blogId",deleteComment);

export default commentRouter;