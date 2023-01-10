const Member =  require('../../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token');
const axios = require("axios");

exports.login = async(req,res) =>{
    try{

        const response = await axios.post("https://mzadey.com/wp-json/aam/v2/authenticate?", null, { 
            params: {
                password: req.body.password,
                username: req.body.email,
            },
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const data = await response.data
        // console.log("data..",data)

        const member = await Member.findByPk(data.user.data.ID)
        const token = jwt.sign({_id: member._id}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: member._id})

        res.status(201).send({member, token: newToken.token, message: "Login Successful"})
    }catch(error){
        let msg = error.message;
        console.log("ERROR...",error.response.data)
        if(error.response && error.response.data.reason){
            if(error.response.data.code==="incorrect_password"){
                msg = "The password you entered is incorrect"
            }else{
                msg = error.response.data.reason
            }  
        }
        console.log("error...",msg)
        res.send({message: msg})
    }   
}