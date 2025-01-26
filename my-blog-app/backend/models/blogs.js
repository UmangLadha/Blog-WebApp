const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Blogs = sequelize.define("blogs", {
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING },
  subtitle: { type: DataTypes.STRING },
  imageLink: { type: DataTypes.STRING },
  content: { type: DataTypes.JSON },
  link: { type: DataTypes.STRING },
  comments: { type: DataTypes.JSON },
  likesCounts: { type: DataTypes.INTEGER },
});

module.exports = Blogs;
