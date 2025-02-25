const { DataTypes } =  require("sequelize");
const { sequelize } =  require("../config/database");

const Comments = sequelize.define("Comments", {
	blogId: {type: DataTypes.INTEGER},
	username: {type: DataTypes.STRING},
	commentText: {type: DataTypes.TEXT}, 
});

module.exports = Comments;

