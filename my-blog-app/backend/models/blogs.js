const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Blogs = sequelize.define("blogs", {
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
	autoIncrement: true,
	unique: true
  },
  author: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  subtitle: { type: DataTypes.STRING },
  imageLink: { type: DataTypes.STRING },
  content: { type: DataTypes.JSON },
  comments: { type: DataTypes.JSON, defaultValue: [] },
  likesCounts: { type: DataTypes.INTEGER, defaultValue: 11 },
});

module.exports = Blogs;
