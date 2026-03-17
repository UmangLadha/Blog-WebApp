import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../data/database.sqlite'
});

export { sequelize };
