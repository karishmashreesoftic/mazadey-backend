
const { DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require("./Member");
const Product = require("./Product");

const Documents = sequelize.define('MZ_DOCUMENTS',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    dpath:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product:{
        type: DataTypes.UUID,
    },

})

module.exports = Documents
