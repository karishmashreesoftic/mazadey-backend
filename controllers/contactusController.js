const Member =  require('../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const axios = require("axios");

exports.contactus = async(req,res) =>{
    try{

        const _id = req.member._id
        const {first_name,last_name,email,subject,message}=req.body
        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/storecontactformdetails?user_id=${_id}&first_name=${first_name}&last_name=${last_name}&email=${email}&subject=${subject}&message=${message}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })

        const data=await itemresponse.data.data.response[0];
        // console.log(data);
       


        res.status(201).send(data)

       
    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}