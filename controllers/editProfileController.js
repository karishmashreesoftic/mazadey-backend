const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.editProfile = async(req,res) =>{
    try{
        
        // const result = await Member.update(
        //     { firstname:'abc'  ,lastname:'def',password:'xyz',mobile:'',password:''},


        //     { where: { _id: req.params.id } }
        //   )
        //   console.log(result);
        //   res.status(201).send({result})

    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}