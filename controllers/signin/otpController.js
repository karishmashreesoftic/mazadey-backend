const validatePhoneNumber = require('validate-phone-number-node-js');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const Member = require("../../models/Member")

exports.sendOTP = async(req, res) => {
    try{
    
        if(!req.body.mobile.includes("+")){
            throw new Error("Please enter number with '+' and country code.")
        }else if(!validatePhoneNumber.validate(req.body.mobile)){
            throw new Error("Please enter a valid number.")
        }

        await client.verify.services(process.env.TWILIO_SMS_SERVICE).verifications.create({to: req.body.mobile, channel: 'sms'})

        res.sendStatus(200)

    }catch(error){
        let msg;
        if(error.code===60200){
            msg = "Invalid Parameter Passed"
        }else if(error.code===60203){
            msg = "You have attempted to get the verification code more than 5 times within 10 min. Wait for the verification to expire (10 minutes)."
        }else if(error.code===60202){
            msg = "You can check verification code maximun 5 times only, after that you will need to wait until the current verification expires (10 minutes) to create a new verification."
        }else if(error.code===20404){
            msg = "OTP is verified successfully."
        }else{
            msg = error.message
        }

        res.send({error: msg})
    }
}   

exports.verifyOTP = async(mobile, code) => {

    try{

        if(!mobile.includes("+")){
            throw new Error("Please enter number with '+' and country code.")
        }else if(!validatePhoneNumber.validate(mobile)){
            throw new Error("Please enter a valid number.")
        }
        
        const otp = await client.verify.services(process.env.TWILIO_SMS_SERVICE).verificationChecks.create({to: mobile, code: code})
        if(otp.status==="approved"){
            return true
        }else{
            throw new Error("OTP verification failed")
        }
    }catch(error){
        let msg;
        if(error.code===60200){
            msg = "Invalid Parameter Passed"
        }else if(error.code===60203){
            msg = "You have attempted to get the verification code more than 5 times within 10 min. Wait for the verification to expire (10 minutes)."
        }else if(error.code===60202){
            msg = "You can check verification code maximun 5 times only, after that you will need to wait until the current verification expires (10 minutes) to create a new verification."
        }else if(error.code===20404){
            msg = "OTP is verified successfully."
        }else{
            msg = error.message
        }
        return {error: msg}
    }

}   
