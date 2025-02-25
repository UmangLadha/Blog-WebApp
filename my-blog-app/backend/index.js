const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const loginRouter = require("./routes/login");
const commentRouter = require("./routes/comments");
const likeRouter = require("./routes/likes");
const { sequelize } = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("my-uploads")); //accessing the my-uploads folder  ----------learn about it----------- 

// Connect to database and create table function 
const connectAndCreate = async()=>{
	try {
		await sequelize.authenticate(); //Testing the connection before syncing with it
		console.log("Connected to database");

		await sequelize.sync({ force: false, alter: true }) //------------------------------
	} catch (error) {
		console.error("Database connection failed:", error);
	}
}

connectAndCreate();

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
