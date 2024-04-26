const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('car', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //userId,
    //productId
});

module.exports = Cart;