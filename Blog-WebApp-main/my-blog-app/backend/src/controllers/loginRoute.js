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
exports.loginUser = void 0;
const userDetailsTable_1 = __importDefault(require("../models/userDetailsTable"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(400);
            throw new Error("username or password required");
        }
        const user = yield userDetailsTable_1.default.findOne({
            where: {
                userName: username,
            },
        });
        if (!user) {
            res.status(401);
            throw new Error("username incorrect");
        }
        const matchPassword = yield bcrypt_1.default.compare(password, user.userPassword);
        if (!matchPassword) {
            res.status(401);
            throw new Error("password incorrect");
        }
        else {
            res.status(200).json({
                user,
                authenticated: true,
                message: "user authenticated succesfully",
                timestampe: Date.now(),
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "error finding user" });
    }
});
exports.loginUser = loginUser;
