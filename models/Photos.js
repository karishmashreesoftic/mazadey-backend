
const { DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require("./Member");
const Product = require("./Product");

const Photos = sequelize.define('MZ_PHOTOS',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    ppath:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product:{
        type: DataTypes.UUID,
        references: {
            model: "MZ_PRODUCTS",
            key: '_id'
        }
    },
})


module.exports = Photos
