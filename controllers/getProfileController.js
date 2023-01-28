const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.getProfile = async(req,res) =>{
    try{

        const token = req.header('Authorization')
      
        const tt = await Token.findOne({ where: { token: token } })
       
        const member=await Member.findByPk(tt.member)
        
        if(!member){
            throw new Error("ID is not matching with any user.")
        }
        res.status(201).send({member})
    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}