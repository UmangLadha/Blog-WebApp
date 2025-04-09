import { sequelize } from "../config/database";
import DataTypes from "sequelize";

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

export default UsersDetails;
