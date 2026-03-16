"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginRoute_1 = require("../controllers/loginRoute");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", loginRoute_1.loginUser);
exports.default = loginRouter;
