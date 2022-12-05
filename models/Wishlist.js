const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Member = require('./Member');
const Product = require('./Product');


const Wishlist = sequelize.define('MZ_WISHLIST', {
  
    MemberID: {
      type: DataTypes.UUID,
      references: {
        model: "MZ_MEMBERS",
        key: '_id'
      }
    },
    ProductId: {
      type: DataTypes.UUID,
      references: {
        model: "MZ_MEMBERS",
        key: '_id'
      }
    }
});

module.exports = Wishlist