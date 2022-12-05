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
    },
    auction:{
        type: DataTypes.UUID,
    },
})

module.exports = Bid
