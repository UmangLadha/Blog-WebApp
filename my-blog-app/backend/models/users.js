const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Users = sequelize.define("users", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
	unique: true,
	autoIncrement:true,
  },
  fullname: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING,
	unique: true
   },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = Users;
