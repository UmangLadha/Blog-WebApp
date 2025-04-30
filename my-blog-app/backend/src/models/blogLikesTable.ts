import { sequelize } from "../config/database";
import { DataTypes, Optional, Model } from "sequelize";

interface LikeAttributes { // interface defining the structure of Like model
	id?: number;
	blogId:number;
	username:string;
	createdAt?:Date;
	updatedAt?:Date;
	};

	// interface defining which fields has to be optional 
	interface LikeCreationAttributes extends Optional<LikeAttributes, "id"|"createdAt"|"updatedAt">{} 
	
	// telling the typescript which values are required and also inherting the model class funtions from sequilize
	interface LikeInstance extends Model<LikeAttributes, LikeCreationAttributes>, LikeAttributes{} 

const Likes = sequelize.define<LikeInstance>("Likes",{
	blogId: {type:DataTypes.INTEGER,allowNull: false},
	username: {type: DataTypes.STRING,allowNull: false},
})
 
export default Likes;
