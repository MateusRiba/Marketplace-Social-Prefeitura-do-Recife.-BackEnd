const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
  // defina as colunas aqui
});

module.exports = Favorite;
