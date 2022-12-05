const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require("./Member");
const Product = require("./Product");

const Bid = sequelize.define('MZ_BIDS',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    amount:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    winner:{
        type: DataTypes.BOOLEAN
    },
    placedby:{
        type: DataTypes.UUID,
        references: {
            model: "MZ_MEMBERS",
            key: '_id'
        },
    },
    auction:{
        type: DataTypes.UUID,
        references: {
            model: "MZ_PRODUCTS",
            key: '_id'
        },
    },
})

module.exports = Bid
