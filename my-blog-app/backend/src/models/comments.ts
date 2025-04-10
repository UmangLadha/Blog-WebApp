import { sequelize } from "../config/database";
import { DataTypes, Optional, Model } from "sequelize";

interface CommentAttributes { // interface defining the structure of comment model
id?: number;
blogId:number;
username:string;
commentText:string;
createdAt?:Date;
updatedAt?:Date;
};

// interface defining which fields has to be optional 
interface CommentCreationAttributes extends Optional<CommentAttributes, "id"|"createdAt"|"updatedAt">{} 

// telling the typescript which values are required and also inherting the model class funtions from sequilize
interface CommentInstance extends Model<CommentAttributes, CommentCreationAttributes>, CommentAttributes{} 

//defining the model and providing the type safety
const Comments = sequelize.define<CommentInstance>("comments",{
	blogId: {type: DataTypes.INTEGER,allowNull: false},
	username: {type: DataTypes.STRING,allowNull: false},
	commentText: {type: DataTypes.TEXT,allowNull: false}, 
});

export default Comments;

