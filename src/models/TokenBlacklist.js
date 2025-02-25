const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TokenBlacklist = sequelize.define("TokenBlacklist", {
    token: { type: DataTypes.STRING, allowNull: false }
});

module.exports = TokenBlacklist;
