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
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.createBlog = exports.getBlogs = void 0;
const blogsTable_1 = __importDefault(require("../models/blogsTable"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// getting all the blogs
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogsTable_1.default.findAll();
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error in fetching blog" });
    }
});
exports.getBlogs = getBlogs;
//adding the new blog in database
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, subtitle, content, author, blogImageLink } = req.body;
    try {
        if (!title || !subtitle || !content || !author || !blogImageLink) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const removeFilePrefix = blogImageLink.replace(/^data:.*;base64,/, "");
        const fileBuffer = Buffer.from(removeFilePrefix, "base64");
        const fileName = `blog-img-${Date.now()}.jpg`;
        const imagePath = path_1.default.join(__dirname, "../../uploads", fileName);
        fs_1.default.writeFileSync(imagePath, fileBuffer);
        const createBlog = {
            blogTitle: title,
            blogAuthor: author,
            blogSubtitle: subtitle,
            blogContent: JSON.parse(content),
            blogImageLink: fileName
        };
        yield blogsTable_1.default.create(createBlog);
        res.status(200).json({ message: "blog added in database" });
    }
    catch (error) {
        console.log("Error in creating blog:", error);
        res.status(400).json({ message: "error in adding blog in the database" });
    }
});
exports.createBlog = createBlog;
// getting the spcific blog
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        if (!blogId) {
            res.status(400).json({ message: "Blog id is invalid or not provided" });
            return;
        }
        const blog = yield blogsTable_1.default.findOne({ where: { blogId: blogId } }); // fetching the blog with given blogId
        if (!blog) {
            res.status(404).json({ message: `Blog with this ${blogId} not found` });
            return;
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error in fetching blog" });
    }
});
exports.getBlogById = getBlogById;
// updating the specific blog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const { title, subtitle, content, author } = req.body;
        // Validating required fields
        if (!title || !subtitle || !content || !author) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const updateBlogData = {
            blogTitle: title,
            blogAuthor: author,
            blogSubtitle: subtitle,
            blogContent: JSON.parse(content),
        };
        const updatedBlog = yield blogsTable_1.default.update(updateBlogData, {
            where: { blogId: blogId },
        });
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error updating blog" });
    }
});
exports.updateBlog = updateBlog;
//deleting the specific blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        yield blogsTable_1.default.destroy({ where: { blogId: blogId } });
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error in deleting blog" });
    }
});
exports.deleteBlog = deleteBlog;
