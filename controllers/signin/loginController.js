const Member =  require('../../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token');
const axios = require("axios");
const Qid = require('../../models/Qid');

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
        console.log("data..",data)
        const member = await Member.findByPk(data.user.data.ID)
        const qid = await Qid.findOne({where: {member: member._id}})
        const flag = qid ? true : false
        const token = jwt.sign({_id: member._id}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: member._id})

        res.status(201).send({member, token: newToken.token, qidstatus: flag, message: "Login Successful"})
    }catch(error){
        console.log("catch",error.message)
        let msg = error.message;
        if(error.response && error.response.data.reason){
            msg = "There is no account with given email address or password is incorrect."
        }
        res.send({message: msg})
    }   
}