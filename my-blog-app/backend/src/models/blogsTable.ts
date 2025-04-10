import { sequelize } from "../config/database";
import { DataTypes, Optional, Model } from "sequelize";

interface BlogAttributes { // interface defining the structure of Blog model
  id?: number;
  blogId:number;
  blogTitle:string;
  blogAuthor:string;
  blogSubtitle:string;
  blogImageLink:string;
  blogContent:JSON;
  blogLikesCount:number;
  blogCommentsCount:number;
  createdAt?:Date;
  updatedAt?:Date;
  };

// interface defining which fields has to be optional 
interface BlogCreationAttributes extends Optional<BlogAttributes, "id"|"createdAt"|"updatedAt">{} 

// telling the typescript which values are required and also inherting the model class funtions from sequilize
interface BlogInstance extends Model<BlogAttributes, BlogCreationAttributes>, BlogAttributes{} 


const Blogs = sequelize.define<BlogInstance>("blogs", {
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blogAuthor: { type: DataTypes.STRING,allowNull: false },
  blogTitle: { type: DataTypes.STRING,allowNull: false },
  blogSubtitle: { type: DataTypes.STRING,allowNull: false },
  blogImageLink: { type: DataTypes.STRING,allowNull: false },
  blogContent: { type: DataTypes.JSON,allowNull: false },
  blogLikesCount: { type: DataTypes.INTEGER,allowNull: false,defaultValue: 0, },
  blogCommentsCount: { type: DataTypes.INTEGER,allowNull: false,defaultValue: 0, },
});

export default Blogs;

