
const { DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require("./Member");

const Qid = sequelize.define('MZ_QID',{

    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    qpath:{
        type: DataTypes.STRING,
    },
    member:{
        type: DataTypes.UUID,
        references: {
            model: "MZ_MEMBERS",
            key: '_id'
        }
    },
})

module.exports = Qid
