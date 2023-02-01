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

        const data=await itemresponse.data.data.response[0];

        let result={
            email:data.user_email,
            name:data.display_name,
            id:data.id,
            phone:data.phone
        }
        // console.log(data.phone);
        if(data.user_status[0]=="registered_user" || data.user_status[0]=="moderator" ||
        data.user_status[0]=="vendor"  ){
            result={
                ...result,
                user_status:1
            }
        }else{
            result={
                ...result,
                user_status:0
            }
        }


        res.status(201).send(result)

       
    }catch(error){
        let msg = error.message;
        
      
        console.log("error...",msg)
        res.send({message: msg})
    }   
}