const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require("validator")
const bcrypt = require('bcryptjs');
const validatePhoneNumber = require('validate-phone-number-node-js');

const memberSchema = new mongoose.Schema({

    fullname:{
        type: String,
        required: true,
        validate(value){
            if(!value.trim().length){
                throw new Error("Fullname must be specified")
            }else if(!/^[A-Za-z]{3,}([\s]+)?[A-Za-z]+$/.test(value)) {
                throw new Error("Fullname must contain 3 characters alphabatical character")
            }
        }
    },
    username:{ 
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!/^[A-Za-z0-9]+$/.test(value)) {
                throw new Error("Username must contain only numeric and alphabatical character")
            }
        }
    },
    mobile:{
        type: String,
        required: true,
        validate(value){
            if(!value.includes("+")){
                throw new Error("Please enter number with '+' and country code.")
            }else if(!validatePhoneNumber.validate(value)){
                throw new Error("Enter a valid Mobile Number");  
            }
        }
    },
    email:{
        type: String,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Email Id is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    qid:{
        qid: {type: mongoose.Schema.Types.ObjectId, ref:'uploads.files'},
        qurl: {type: String} 
    },
    membertype:{ 
        type: String, 
        required: true 
    },
    fcmtoken:{ 
        type: String, 
        default: null 
    },
    noofproducts:{ 
        type: Number, 
        default: 0 
    },
    noofbids:{ 
        type: Number, 
        default: 0 
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId, ref:'Product'
    }],
    balance:{
        type: Number, 
        default: 0
    },
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }],
    status:{ type: String, default: "pending" },
    createdat:{ type: Date },
})

memberSchema.pre('save', async function(next) {
    const member = this

    if(member.isModified('password')){
        member.password = await bcrypt.hash(member.password,8)
    }
    next()
})

memberSchema.methods.generateAuthToken = async function() {
    const member = this
    const token = jwt.sign({_id: member._id.toString()}, process.env.JWT_SECRET)

    member.tokens = member.tokens.concat({ token });
    await member.save();

    return token
}

memberSchema.statics.findByCredentials = async (email, password) => {
    const member = await Member.findOne({ email })
    if (!member) {
        throw new Error(
            "There is no account with given username. Please signup first to login !"
        );
    }
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
        throw new Error("The entered password is incorrect");
    }
    return member;
}


const Member = mongoose.model('Member',memberSchema)

module.exports = Member
