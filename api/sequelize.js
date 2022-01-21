const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: './sqlite/FoodList.db'
})

sequelize.sync({
    alter: true
}).then(() => {
    console.log('All models were synced')
});

module.exports = sequelize;