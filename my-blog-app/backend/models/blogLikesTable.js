const {sequelize} = require("../config/database");
const { DataTypes } = require("sequelize");

const Likes = sequelize.define("Likes",{
	blogId: {type:DataTypes.INTEGER},
	username: {type: DataTypes.STRING},
})
 
module.exports = Likes;