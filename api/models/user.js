const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },

  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
