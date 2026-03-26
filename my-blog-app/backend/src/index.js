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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRegisterRoutes_1 = __importDefault(require("./routes/userRegisterRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const blogCommentRoutes_1 = __importDefault(require("./routes/blogCommentRoutes"));
const blogLikeRoutes_1 = __importDefault(require("./routes/blogLikeRoutes"));
const database_1 = require("./config/database");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middleware functions
app.use((0, cors_1.default)()); // Enables the backend to accept requests from frontend  
app.use(express_1.default.json({ limit: '50mb' })); // Adjust limit as needed
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' })); // Adjust limit as needed
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads"))); //accessing the my-uploads folder
// Connecting with the database and creating the database in table form 
const connectAndCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate(); //Testing the connection before syncing with it
        console.log("Connected to database");
        yield database_1.sequelize.sync({ force: false, alter: true }); //------------------------------
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
});
connectAndCreate(); // calling the above function
// Mount routes
app.use("/users", userRegisterRoutes_1.default);
app.use("/login", loginRoute_1.default);
app.use("/blogs", blogRoutes_1.default);
app.use("/likes", blogLikeRoutes_1.default);
app.use("/comments", blogCommentRoutes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
