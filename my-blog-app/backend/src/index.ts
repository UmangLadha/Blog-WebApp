import express from "express";
import cors from "cors";
import userRouter from "./routes/userRegisterRoutes";
import blogRouter from "./routes/blogRoutes";
import loginRouter from "./routes/loginRoute";
import commentRouter from "./routes/blogCommentRoutes";
import likeRouter from "./routes/blogLikeRoutes";
import { connectDB } from "./config/database";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware functions
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:5000",
	process.env.FRONTEND_URL,
].filter(Boolean) as string[];

console.log("Allowed CORS origins:", allowedOrigins);

app.use(cors({
	origin: allowedOrigins,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	credentials: true,
}));
app.use(express.json({ limit: '50mb' })); // Adjust limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Adjust limit as needed
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); //accessing the my-uploads folder

// Connecting with the MongoDB database
connectDB();

// Mount routes
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/blogs", blogRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
