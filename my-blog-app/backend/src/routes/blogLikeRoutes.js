"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_1 = require("../controllers/likes");
const likeRouter = (0, express_1.Router)();
likeRouter.get("/:blogId", likes_1.getLikes);
likeRouter.post("/", likes_1.createLike);
likeRouter.delete("/:blogId/:username", likes_1.deleteLike);
exports.default = likeRouter;
