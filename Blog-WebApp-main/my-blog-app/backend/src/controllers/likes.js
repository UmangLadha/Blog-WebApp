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
exports.deleteLike = exports.createLike = exports.getLikes = void 0;
const blogsTable_1 = __importDefault(require("../models/blogsTable"));
const blogLikesTable_1 = __importDefault(require("../models/blogLikesTable"));
// fetching all the likes from the table
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    if (!blogId) {
        throw new Error("Invaild blogId!");
    }
    try {
        const like = yield blogLikesTable_1.default.findAll({ where: { blogId: blogId } });
        res.status(200).json(like);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error fetching like " });
    }
});
exports.getLikes = getLikes;
// posting the new likes in the table
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, username } = req.body;
    try {
        if (!blogId || !username) {
            res.status(400);
            throw new Error("Both blogId and username are required");
        }
        yield blogLikesTable_1.default.create({
            blogId: blogId,
            username: username,
        });
        const blog = yield blogsTable_1.default.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog
        if (!blog) {
            throw new Error("Blog not Found");
        }
        const updatedLikeCount = blog.blogLikesCount + 1; // incrementing the like count
        yield blogsTable_1.default.update({
            blogLikesCount: updatedLikeCount,
        }, { where: { blogId: blogId } });
        res.status(200).json("Added the like data and updated the likecount");
    }
    catch (error) {
        console.log("error in liking the blog", error);
        res.status(400).json({ error: "error in liking the blog" });
    }
});
exports.createLike = createLike;
//deleting the spacific blog from the like table and reducing the like count in blog table
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, username } = req.params;
    try {
        if (!blogId || !username) {
            res.status(400);
            throw new Error("Both blogId and username are required");
        }
        yield blogLikesTable_1.default.destroy({ where: { blogId: blogId, username: username } });
        const blog = yield blogsTable_1.default.findOne({ where: { blogId: blogId } }); //retriving the likes count from the blog
        if (!blog) {
            res.status(404);
            throw new Error("blog not Found");
        }
        const updatedLikeCount = blog.blogLikesCount - 1; // decrementing the like count
        yield blogsTable_1.default.update({
            blogLikesCount: updatedLikeCount,
        }, { where: { blogId: blogId } });
        res.status(200).json({ message: "dislikes the blog" });
    }
    catch (error) {
        console.log("error in deleting the like data", error);
        res.status(400).json({ error: "error in deleting the likeData" });
    }
});
exports.deleteLike = deleteLike;
