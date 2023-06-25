const { Sequelize } = require('sequelize');
require("dotenv").config();

// Create a Sequelize instance with your PostgreSQL connection details
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
