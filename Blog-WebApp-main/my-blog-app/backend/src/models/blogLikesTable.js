"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
;
const Likes = database_1.sequelize.define("Likes", {
    blogId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.default = Likes;
