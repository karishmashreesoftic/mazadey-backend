const Member =  require('../../models/Member')
const {sendOTP, verifyOTP} = require('./otpController')
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js');

exports.signup = async(req, res) => {
    try{

        if(req.body.fullname){
            if(!req.body.fullname.trim().length){
                throw new Error("Fullname must be specified")
            }else if(!/^[A-Za-z]{3,}([\s]+)?[A-Za-z]+$/.test(req.body.fullname)) {
                throw new Error("Fullname must contain atleast 3 alphabatical character")
            }
        }
        if(req.body.username){
            if(!/^[A-Za-z0-9]+$/.test(req.body.username)) {
                throw new Error("Username must contain only numeric and alphabatical character")
            }
        }
        if(req.body.mobile){
            if(!req.body.mobile.includes("+")){
                throw new Error("Please enter number with '+' and country code.")
            }else if(!validatePhoneNumber.validate(req.body.mobile)){
                throw new Error("Enter a valid Mobile Number");  
            }
        }   
        if(req.body.email){
            if(!validator.isEmail(req.body.email)) {
                throw new Error("Email Id is not valid")
            }
        }
        if(await Member.findOne({mobile: req.body.mobile, membertype: req.body.membertype})){
            throw new Error(`Mobile number is already associated with other ${req.body.membertype} account.`)
        }
        if(await Member.findOne({email: req.body.email, membertype: req.body.membertype})){
            throw new Error(`Email address is already associated with other ${req.body.membertype} account.`)
        }
        if(await Member.findOne({username: req.body.username})){
            throw new Error("Username is already taken, Please choose unique username.")
        }

        const verified = await verifyOTP(req.body.mobile, req.body.code)
        if(verified.error){
            throw new Error(verified.error)
        }

        const newMember = new Member(req.body)
        await newMember.save()   
        const token = await newMember.generateAuthToken() 
        res.status(201).send({member: newMember, token})

    }catch(error){

        let em;
        if(error.errors){
            em =  error.errors[Object.keys(error.errors)[0]].properties.message
        }else{
            em =  error.message
        }
        res.send({error: em})
    }   
}