const { Sequelize } = require("sequelize");
const config = require("../utils/config");

const sequelize = new Sequelize(
  `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`,
  { logging: false, native: false }
);

module.exports = sequelize;
