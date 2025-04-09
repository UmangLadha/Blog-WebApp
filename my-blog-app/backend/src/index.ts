import express from "express";
import cors from "cors";
import  userRouter from "./routes/signupRoute";
import blogRouter from "./routes/blogs";
import loginRouter from "./routes/loginRoute";
import commentRouter from "./routes/comments";
import likeRouter from "./routes/likes";
import { sequelize } from "./config/database";

const app = express();

// Middleware functions
app.use(cors()); // Enables the backend to accept requests from frontend  
app.use(express.json());
app.use(express.static("my-uploads")); //accessing the my-uploads folder

// Connecting with the database and creating the database in table form 
const connectAndCreate = async()=>{
	try {
		await sequelize.authenticate(); //Testing the connection before syncing with it
		console.log("Connected to database");

		await sequelize.sync({ force: false, alter: true }) //------------------------------
	} catch (error) {
		console.error("Database connection failed:", error);
	}
}

connectAndCreate(); // calling the above function

// Mount routes
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/blogs", blogRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
