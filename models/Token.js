
const { DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require("./Member");

const Token = sequelize.define('MZ_TOKENS',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    member:{
        type: DataTypes.INTEGER,
    }

})

module.exports = Token
