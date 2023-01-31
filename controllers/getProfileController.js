const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.getProfile = async(req,res) =>{
    try{

        const id = req.member._id
        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getuserprofile?user_id=${id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })

        const data=await itemresponse.data;


        res.status(201).send(data)

       
    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}