// const validator = require("validator");
// const Member = require("../../models/Member");
// const Token = require("../../models/Token");
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// exports.sendToEmail = async(req, res) => {
//     try{

//         if (!validator.isEmail(req.body.email)) {
//             throw new Error("Enter a valid Email Address");
//         }

//         let member = await Member.findOne({where: {email: req.body.email}})
  
//         if(!member){
//             throw new Error("No member present with given email id.")
//         }

//         await client.verify.services(process.env.TWILIO_EMAIL_SERVICE).verifications.create({to: req.body.email, channel: 'email'})
//         res.status(200).send({message: "Success"}) 

//     }catch(error){
//         let msg;
//         if(error.code===60200){
//             msg = "Invalid Parameter Passed"
//         }else if(error.code===60203){
//             msg = "You have attempted to get the verification code more than 5 times within 10 min. Wait for the verification to expire (10 minutes)."
//         }else if(error.code===60202){
//             msg = "You can check verification code maximun 5 times only, after that you will need to wait until the current verification expires (10 minutes) to create a new verification."
//         }else if(error.code===20404){
//             msg = "OTP is verified successfully."
//         }else{
//             msg = error.message
//         }

//         res.send({message: msg})
//     }
// }

// exports.verifyEmailCode = async(req, res) => {
//     try{

//         const otp = await client.verify.services(process.env.TWILIO_EMAIL_SERVICE).verificationChecks.create({to: req.body.email, code: req.body.otp})
//         if(otp.status==="approved"){

//             const member = await Member.findOne({where: {email: req.body.email}})
//             const token = jwt.sign({_id: member._id.toString()}, process.env.JWT_SECRET)
//             const newToken = await Token.create({token: token, member: member._id})

//             res.status(201).send({member, token: newToken.token})
//             // res.status(200).send({message: "Success"}) 
                
//         }else{
//             throw new Error("OTP verification failed")
//         }

//     }catch(error){

//         let msg;
//         if(error.code===60200){
//             msg = "Invalid Parameter Passed"
//         }else if(error.code===60203){
//             msg = "You have attempted to get the verification code more than 5 times within 10 min. Wait for the verification to expire (10 minutes)."
//         }else if(error.code===60202){
//             msg = "You can check verification code maximun 5 times only, after that you will need to wait until the current verification expires (10 minutes) to create a new verification."
//         }else if(error.code===20404){
//             msg = "OTP is already verified successfully."
//         }else{
//             msg = error.message
//         }

//         res.send({message: msg})
//     }
// }