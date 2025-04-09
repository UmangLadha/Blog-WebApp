const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Blogs = sequelize.define("blogs", {
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blogAuthor: { type: DataTypes.STRING },
  blogTitle: { type: DataTypes.STRING },
  blogSubtitle: { type: DataTypes.STRING },
  blogImageLink: { type: DataTypes.STRING },
  blogContent: { type: DataTypes.JSON },
  blogLikesCounts: { type: DataTypes.INTEGER },
});

module.exports = Blogs;
