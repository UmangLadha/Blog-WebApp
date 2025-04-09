import { sequelize } from "../config/database";
import DataTypes from "sequelize";

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
  blogLikesCount: { type: DataTypes.INTEGER, defaultValue: 0, },
  blogCommentsCount: { type: DataTypes.INTEGER, defaultValue: 0, },
});

export default Blogs;

