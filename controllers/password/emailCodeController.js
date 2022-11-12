const validator = require("validator")
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendToEmail = async(req, res) => {
    try{

        if (!validator.isEmail(req.body.email)) {
            throw new Error("Enter a valid Email Address");
        }

        await client.verify.services(process.env.TWILIO_EMAIL_SERVICE).verifications.create({to: req.body.email, channel: 'email'})
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
            msg = "OTP is already verified successfully."
        }else{
            msg = error.message
        }

        res.send({error: error.message})
    }
}

exports.verifyEmailCode = async(req, res) => {
    try{

        const otp = await client.verify.services(process.env.TWILIO_EMAIL_SERVICE).verificationChecks.create({to: req.body.email, code: req.body.otp})
        if(otp.status==="approved"){

            res.sendStatus(200)
                
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
            msg = "OTP is already verified successfully."
        }else{
            msg = error.message
        }

        res.send({error: msg})
    }
}