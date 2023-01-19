const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.getProfile = async(req,res) =>{
    try{
        const member = await Member.findByPk(req.params.id)
       
        // console.log(data.user.data.ID);
        // console.log(req.params.id);
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