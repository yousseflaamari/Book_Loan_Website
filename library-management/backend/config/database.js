const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library_management', 'root', '2003', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
