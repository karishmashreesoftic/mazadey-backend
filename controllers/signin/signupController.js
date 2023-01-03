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
const fileToArrayBuffer = require('file-to-array-buffer')
const fs = require("fs")
var FormData = require('form-data');

exports.signup = async(req, res) => {
    try{

        const {firstname, lastname, mobile, email, password, code} = req.body

        // if(fullname){
        //     if(!fullname.trim().length){
        //         throw new Error("Fullname must be specified")
        //     }else if(!/^[A-Za-z]{3,}([\s]+)?[A-Za-z]+$/.test(fullname)) {
        //         throw new Error("Invalid fullname. Only alphabatical characters are allowed.")
        //     }
        // }

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

        if(req.file===undefined){
            throw new Error("It is mandatory to upload qid")
        }

        m = await Member.findOne({where: {email}})
        if(m){
            throw new Error(`Email address is already associated with other account.`)
        }
        // console.log("m...",m)

        const authtoken = "tomasz@innovationnomads.com:s9TGktXDBM";
        const encodedToken = Buffer.from(authtoken).toString('base64');
        // console.log("req.file...",req.file)

        const ufile = fs.createReadStream(req.file.path)
    
        let qiddata = new FormData()
        qiddata.append("file", ufile)

        const qidresponse = await axios.post("https://mzadey.com/wp-json/wp/v2/media", qiddata, {
            headers: {
                "Content-Type": "multipart/form-data;",
                'Authorization': 'Basic '+ encodedToken
            }
        })

        const qid = await qidresponse.data
        // console.log("qid..",qid)

        fs.unlinkSync(req.file.path)

        let userdata = new FormData()
        userdata.append("item_meta[6]", firstname) //First Name
        userdata.append("item_meta[7]", lastname) //Last Name
        userdata.append("item_meta[9]", email) //Email
        userdata.append("item_meta[10]", password) //Password
        userdata.append("item_meta[conf_10]", password) //Confirm Password
        userdata.append("item_meta[47]", mobile) //Mobile
        // userdata.append("item_meta[48]", code) //OTP
        userdata.append("item_meta[49]", qid.id) //QatariId

        const userresponse = await axios.post("https://mzadey.com/wp-json/frm/v2/forms/2/entries", userdata, {
            headers: {
                "Content-Type": "multipart/form-data;",
                "Accept-Encoding": "gzip,deflate,compress",
                'Authorization': 'Basic '+ encodedToken,
                "Cookie" : "transient_key=f; wp-wpml_current_admin_language_d41d8cd98f00b204e9800998ecf8427e=en"
            }
        })
        const user = await userresponse.data
        // console.log("user..",user)

        const newMember = await Member.create({
            _id: user.user_id,
            firstname: firstname,
            lastname: lastname,
            fullname: user.meta.zah2u,
            email: email,
            mobile: mobile,
            username: email,
            password: password,
            qid: qid.guid.rendered
        })

        const token = jwt.sign({_id: newMember._id}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: newMember._id})

        res.status(201).send({member: newMember, token : newToken.token, message: "Signup Successful"})

    }catch(error){
        console.log("error.exception...",error.exception)
        console.log("error.message...",error.message)
        res.send({message: error.message})
    }   
}