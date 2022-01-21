const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Friendship = sequelize.define("Friendships", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user1: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    user2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Pending"
    },
    isPending: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Friendship;
