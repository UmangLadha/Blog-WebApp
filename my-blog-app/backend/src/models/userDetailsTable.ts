const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UsersDetails = sequelize.define("usersDetails", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
	unique: true,
	autoIncrement:true,
  },
  userFullname: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING },
  userEmail: { type: DataTypes.STRING },
  userPassword: { type: DataTypes.STRING },
});

module.exports = UsersDetails;
