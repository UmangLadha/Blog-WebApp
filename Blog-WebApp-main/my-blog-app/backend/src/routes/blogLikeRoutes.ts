import { Router } from "express";
import { getLikes, deleteLike, createLike } from "../controllers/likes";

const likeRouter = Router();

likeRouter.get("/:blogId",getLikes);
likeRouter.post("/",createLike);
likeRouter.delete("/:blogId/:username",deleteLike);

export default likeRouter;