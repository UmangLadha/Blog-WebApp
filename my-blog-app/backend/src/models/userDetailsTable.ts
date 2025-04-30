import { sequelize } from "../config/database";
import { DataTypes, Optional, Model } from "sequelize";

interface UserAttributes {
  // interface defining the structure of Blog model
  id?: number;
  userId?: number;
  userName: string;
  userFullname: string;
  userEmail: string;
  userPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// interface defining which fields has to be optional
interface UserCreationAttributes
  extends Optional<UserAttributes, "id"| "userId" | "createdAt" | "updatedAt"> {}

// telling the typescript which values are required and also inherting the model class funtions from sequilize
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const Users = sequelize.define<UserInstance>("users", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  userFullname: { type: DataTypes.STRING, allowNull: false },
  userName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  userPassword: { type: DataTypes.STRING, allowNull: false },
});

export default Users;
