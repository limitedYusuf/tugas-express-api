const Sequelize = require('sequelize');
const sequelizeConfig = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];

const configdb = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = configdb;
