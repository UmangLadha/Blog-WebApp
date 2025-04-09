import { sequelize } from "../config/database";
import DataTypes from "sequelize";

const BlogComments = sequelize.define("Comments", {
	blogId: {type: DataTypes.INTEGER},
	username: {type: DataTypes.STRING},
	commentText: {type: DataTypes.TEXT}, 
});

export default BlogComments;

