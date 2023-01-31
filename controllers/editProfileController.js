const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.editProfile = async(req,res) =>{
    try{
        
        const id=req.member._id;
        const {mobile}=req.body

        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/edituserprofile?user_id=${id}&&phone_number=${mobile}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })

        const data=await itemresponse.data;

        const result = await Member.update(
            { mobile:mobile},
            { where: { _id: id } }
          )


        res.status(201).send(data)
       

    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}