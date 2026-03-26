"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const commentRouter = (0, express_1.Router)();
commentRouter.post("/", comments_1.createComment);
commentRouter.get("/:blogId", comments_1.getComment);
commentRouter.delete("/:blogId", comments_1.deleteComment);
exports.default = commentRouter;
