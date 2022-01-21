const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');


const FoodListing = sequelize.define('FoodListing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    foodName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
    },
    
    description: DataTypes.STRING, //description is optional, can be NULL

    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    listingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userName: {
        type: DataTypes.STRING,
        allowNull:false
    },

    imgSrc: {
        type: DataTypes.STRING,
        allowNull:true
    },
    claimedBy: {
        type: DataTypes.STRING,
        defaultValue: "Nobody"
    }
});

module.exports = FoodListing;