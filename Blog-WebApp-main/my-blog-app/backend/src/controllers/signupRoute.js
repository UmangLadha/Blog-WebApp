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
exports.deleteUser = exports.getUserById = exports.registerUser = exports.getUsers = void 0;
const userDetailsTable_1 = __importDefault(require("../models/userDetailsTable"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
// accessing the all user data
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userDetailsTable_1.default.findAll();
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Error in fetching users:", error);
        res.status(400).json({ message: "users not found in database" });
    }
});
exports.getUsers = getUsers;
//adding the new user data in database
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullname, email, password } = req.body;
    try {
        if (!username || !email || !fullname || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existingUser = yield userDetailsTable_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ userName: username }, { userEmail: email }], // op(operator) means checking the condition in users table where userName or userEmail is similar or not
            },
        });
        if (existingUser) {
            if (existingUser.userName === username) {
                res.status(400).json({ message: `Username "${username}" already exists` });
                return;
            }
            if (existingUser.userEmail === email) {
                res.status(400).json({ message: `Email "${email}" is already registered` });
                return;
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 14);
        const user = yield userDetailsTable_1.default.create({
            userName: username,
            userFullname: fullname,
            userEmail: email,
            userPassword: hashedPassword,
        });
        res.status(200).json({ message: `${user.userName} added in the database` });
    }
    catch (error) {
        console.log("Error in registering user:", error);
        res.status(400).json({ message: "error in adding user in database" });
    }
});
exports.registerUser = registerUser;
// accessing the spcific user data
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: `${id} not found or may be it doesnt exits` });
            return;
        }
        const user = yield userDetailsTable_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Error in getting user:", error);
        res.status(400).json({ message: `${id} user not found in the database` });
    }
});
exports.getUserById = getUserById;
//deleting the specific user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userDetailsTable_1.default.destroy({ where: { userId: id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "user deleted" });
    }
    catch (error) {
        console.log("Error in deleting user:", error);
        res.status(400).json({ error: "error in deleting user" });
    }
});
exports.deleteUser = deleteUser;
