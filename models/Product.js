
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js');
const Photos = require("./Photos");
const Documents = require("./Documents");
const Bid = require("./Bid");
const Member = require("./Member");

const Product = sequelize.define('MZ_PRODUCTS',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    minbid:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    price:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    type:{ 
        type: DataTypes.STRING, 
        allowNull: false
    },
    status:{ type: DataTypes.STRING, defaultValue: "live" },
    statusat: { type: DataTypes.DATE },
    createdby:{ 
        type: DataTypes.UUID,
        references: {
            model: "MZ_MEMBERS",
            key: '_id'
        }
    },
    winner:{ 
        type: DataTypes.UUID,
        references: {
            model: "MZ_MEMBERS",
            key: '_id'
        }
    }
})

module.exports = Product
