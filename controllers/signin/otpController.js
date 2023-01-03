const validatePhoneNumber = require('validate-phone-number-node-js');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const Member = require("../../models/Member");
const axios = require("axios");
var FormData = require('form-data');

exports.sendOTP = async(req, res) => {
    try{
 
        if(!req.body.mobile.includes("+")){
            throw new Error("Please enter number with '+' and country code.")
        }else if(!validatePhoneNumber.validate(req.body.mobile)){
            throw new Error("Please enter a valid number.")
        }

        let otpformdata = new FormData();
        otpformdata.append("user_email", req.body.mobile)
        otpformdata.append("user_phone", req.body.mobile)
        otpformdata.append("action", "miniorange_frm_generate_otp")
        otpformdata.append("mobile_api", "true")

        const response = await axios.post("https://mzadey.com/wp-admin/admin-ajax.php", otpformdata, {
            headers: {
                "Content-Type": "multipart/form-data;"
            },
        });
        console.log("response.data..",response.data)
        const result = await response.data
        console.log("result..",result)

        if(result.result!=="success"){
            throw new Error(result.message)
        }
        res.status(200).send({message: "Success"})

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }
}   
