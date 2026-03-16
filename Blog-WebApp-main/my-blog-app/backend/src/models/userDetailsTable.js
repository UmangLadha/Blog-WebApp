"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const Users = database_1.sequelize.define("users", {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    userFullname: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userEmail: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userPassword: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.default = Users;
