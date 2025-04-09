import dotenv from 'dotenv';
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  storage: '../data/database.sqlite'
});

export { sequelize, DataTypes };
