const Member =  require('../../models/Member')
const {sendOTP, verifyOTP} = require('./otpController')
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js')
const connection = require("../../db")
const uniqid = require('uniqid')
const bcrypt = require('bcryptjs')
const Token = require('../../models/Token')
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.signup = async(req, res) => {
    try{

        const {fullname, mobile, email, password,code} = req.body

        if(fullname){
            if(!fullname.trim().length){
                throw new Error("Fullname must be specified")
            }else if(!/^[A-Za-z]{3,}([\s]+)?[A-Za-z]+$/.test(fullname)) {
                throw new Error("Invalid fullname. Only alphabatical characters are allowed.")
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
        
        // let m = await Member.findOne({where: {mobile}})
        // if(m){
        //     throw new Error(`Mobile number is already associated with other ${m.membertype} account.`)
        // }

        const verified = await verifyOTP(mobile, code)
        if(verified.message){
            throw new Error(verified.message)
        }
        
        m = await Member.findOne({where: {email}})
        if(m){
            throw new Error(`Email address is already associated with other account.`)
        }

        const response = await axios.post("https://mzadey.com/wp-json/wp/v2/users", null, { params: {
            name: fullname,
            password: password,
            email: email,
            username: email,
        }})
        const data = await response.data

        const newMember = await Member.create({
            _id: data.id,
            fullname: data.name,
            email: data.email,
            mobile: mobile,
            username: data.username,
        })
        const token = jwt.sign({_id: newMember._id}, process.env.JWT_SECRET)
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