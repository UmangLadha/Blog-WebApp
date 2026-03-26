"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
;
//defining the model and providing the type safety
const Comments = database_1.sequelize.define("comments", {
    blogId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    commentText: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
});
exports.default = Comments;
