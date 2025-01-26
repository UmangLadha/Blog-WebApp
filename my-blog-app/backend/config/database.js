require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  storage: '../data/database.sqlite'
});

module.exports = { sequelize, DataTypes };
