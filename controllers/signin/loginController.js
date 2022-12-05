const Member =  require('../../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token');

exports.login = async(req,res) =>{
    try{
        const member = await Member.findByCredentials(req.body.email,req.body.password)

        const token = jwt.sign({_id: member._id.toString()}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: member._id})

        res.status(201).send({member, token: newToken.token,message: "Login Successful"})
    }catch(error){
        res.send({message: error.message})
    }   
}