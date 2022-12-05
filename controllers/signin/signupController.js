const Member =  require('../../models/Member')
const {sendOTP, verifyOTP} = require('./otpController')
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js')
const connection = require("../../db")
const uniqid = require('uniqid')
const bcrypt = require('bcryptjs')
const Token = require('../../models/Token')
const jwt = require('jsonwebtoken');

exports.signup = async(req, res) => {
    try{

        const {fullname, username, mobile, email, password, membertype, code} = req.body

        if(fullname){
            if(!fullname.trim().length){
                throw new Error("Fullname must be specified")
            }else if(!/^[A-Za-z]{3,}([\s]+)?[A-Za-z]+$/.test(fullname)) {
                throw new Error("Invalid fullname. Only alphabatical characters are allowed.")
            }
        }
        if(username){
            if(!/^[A-Za-z0-9]+$/.test(username)) {
                throw new Error("Username must contain only numeric and alphabatical character")
            }
        }
        if(mobile){
            if(!mobile.includes("+")){
                throw new Error("Please enter number with '+' and country code.")
            }else if(!validatePhoneNumber.validate(mobile)){
                throw new Error("Enter a valid Mobile Number");  
            }
        }   
        if(email){
            if(!validator.isEmail(email)) {
                throw new Error("Email Id is not valid")
            }
        }

        // let test = await Member.findOne({where: 
        //     {
        //         membertype,
        //         $or : [
        //             {mobile},
        //             {email},
        //             {username}
        //         ]
        //     }
        // })

        // console.log("test..",test)
        
        let m = await Member.findOne({where: {mobile, membertype}})
        if(m){
            throw new Error(`Mobile number is already associated with other ${m.membertype} account.`)
        }
        
        m = await Member.findOne({where: {email}})
        if(m){
            throw new Error(`Email address is already associated with other ${m.membertype} account.`)
        }

        m = await Member.findOne({where: {username}})
        if(m){
            throw new Error("Username is already taken, Please choose unique username.")
        }

        const verified = await verifyOTP(mobile, code)
        if(verified.message){
            throw new Error(verified.message)
        }

        const newMember = await Member.create(req.body)
        const token = jwt.sign({_id: newMember._id.toString()}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: newMember._id})

        res.status(201).send({member: newMember, token : newToken.token, message: "Signup Successful"})

    }catch(error){

        let em;
        if(error.errors){
            em =  error.errors[Object.keys(error.errors)[0]].properties.message
        }else{
            em =  error.message
        }
        res.send({message: em})
    }   
}