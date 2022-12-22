const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require("./Token");
const Qid = require("./Qid");
const Bid = require("./Bid");

const Member = sequelize.define('MZ_MEMBERS',{

    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username:{ 
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
    fcmtoken:{ 
        type: DataTypes.STRING, 
        defaultValue: null 
    },
    noofproducts:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    noofbids:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    balance:{
        type: DataTypes.INTEGER, 
        defaultValue: 0
    },
    status:{ type: DataTypes.STRING, defaultValue: "pending" },
})

// Member.beforeCreate(async (member, options) => {

//     // console.log("beforeCreate...",member)

//     member.password = await bcrypt.hash(member.password, 8);
//     // console.log("after..",member)

// });

// Member.Instance.prototype.generateAuthToken = function () {
//     console.log(this.title);
// }

// memberSchema.methods.generateAuthToken = async function() {
//     const member = this
//     const token = jwt.sign({_id: member._id.toString()}, process.env.JWT_SECRET)

//     member.tokens = member.tokens.concat({ token });
//     await member.save();

//     return token
// }

// Member.findByCredentials = async (email, password) => {

//     let m = await Member.findOne({where: {email}})
//     if (!m) {
//         throw new Error(
//             "There is no account with given Email. Please signup first to login !"
//         );
//     }
//     const isMatch = await bcrypt.compare(password, m.password);
//     if (!isMatch) {
//         throw new Error("The entered password is incorrect");
//     }
//     return m;
// }


module.exports = Member
