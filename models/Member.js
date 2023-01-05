const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const Member = sequelize.define('MZ_MEMBERS',{

    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    firstname:{
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    fullname:{
        type: DataTypes.STRING,
    },
    username:{ 
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    mobile:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    qid:{
        type: DataTypes.STRING,
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
