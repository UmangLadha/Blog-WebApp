"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getComment = exports.createComment = void 0;
const blogsTable_1 = __importDefault(require("../models/blogsTable"));
const comments_1 = __importDefault(require("../models/comments"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, username, commentText } = req.body;
    try {
        if (!blogId || !username || !commentText) {
            res.status(400);
            throw new Error("Value is missing");
        }
        yield comments_1.default.create({
            blogId: blogId,
            username: username,
            commentText: commentText,
        });
        const blog = yield blogsTable_1.default.findOne({ where: { blogId: blogId } }); //retriving the Comment count from the blog
        if (!blog) {
            res.status(404);
            throw new Error("blog not Found");
        }
        const updateCommentCount = blog.blogCommentsCount + 1; // incrementing the Comment count
        yield blogsTable_1.default.update({
            blogCommentsCount: updateCommentCount,
        }, { where: { blogId: blogId } });
        res.status(200).json("comment has been saved");
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ error: "error in adding the commnet into database" });
    }
});
exports.createComment = createComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        if (!blogId) {
            res.status(404);
            throw new Error("Invailed BlogId provided!");
        }
        const comments = yield comments_1.default.findAll({ where: { blogId: blogId } });
        res.status(200).json(comments);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error fetching comments " });
    }
});
exports.getComment = getComment;
//deleting the specific comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        //////////////////////////////////////////////console.log(blogId);
        comments_1.default.destroy({ where: { blogId: blogId } });
        const blog = yield blogsTable_1.default.findOne({ where: { blogId: blogId } }); //retriving the Comment count from the blog
        if (!blog) {
            res.status(404);
            throw new Error("blog not Found");
        }
        const updateCommentCount = blog.blogCommentsCount - 1; // decrementing the Comment count
        yield blogsTable_1.default.update({
            blogCommentsCount: updateCommentCount,
        }, { where: { blogId: blogId } });
        res.status(200).json({ message: `Comment deleted with this ${blogId}` });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error in deleting user" });
    }
});
exports.deleteComment = deleteComment;
