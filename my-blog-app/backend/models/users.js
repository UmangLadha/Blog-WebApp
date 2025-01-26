const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Users = sequelize.define("users", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = Users;
