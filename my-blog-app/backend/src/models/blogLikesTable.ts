import { sequelize } from "../config/database";
import DataTypes from "sequelize";

const Likes = sequelize.define("Likes",{
	blogId: {type:DataTypes.INTEGER},
	username: {type: DataTypes.STRING},
})
 
export default Likes;