"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
;
const Blogs = database_1.sequelize.define("blogs", {
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    blogAuthor: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    blogTitle: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    blogSubtitle: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    blogImageLink: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    blogContent: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    blogLikesCount: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0, },
    blogCommentsCount: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0, },
});
exports.default = Blogs;
