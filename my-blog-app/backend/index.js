const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const loginRouter = require("./routes/login")
const { sequelize } = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database and create table function 
const connectAndCreate = async()=>{
	try {
		await sequelize.authenticate();
		console.log("Connected to database");
		await sequelize.sync();
		console.log("Database & tables synchronized successfully!");
	} catch (error) {
		console.error("Database connection failed:", error);
	}
}

connectAndCreate();

// Mount routes
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
