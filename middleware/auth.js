const jwt = require('jsonwebtoken');
const Member = require("../models/Member");
const axios = require('axios');

exports.auth = async (req, res, next) => {
    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        let member;
        member = await Member.findByPk(decoded._id)
        if(!member){
            throw new Error()
        }

        let routes = [
            "getallauctions",
            "getallproducts",
            "getitem",
            "getmybids"
        ]

        if(routes.includes(req.originalUrl.split("/")[1])){
            const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');
            const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getallwishlist?user_id=${member._id}`,{
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress",
                }
            })
            let items = await itemresponse.data
            items = items.data.wishlist
            let ids = [];
            if(items){
                for(let i=0; i<items.length; i++){
                    ids.push(Number(items[i].ID))
                }
            }

            req.wishlist = ids
        }

        req.token = token
        req.member = member
        next()
        
    }catch(e){
        console.log("error.message...",e.response)
        res.status(401).send({message: "Please authenticate...!!!"})
    }
}

// exports.adminauth = async (req, res, next) => {
//     try{

//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
//         let admin;
//         admin = await Admin.findOne({_id:decoded._id, 'token': token})
        
//         if(!admin){
//             throw new Error()
//         }

//         req.token = token
//         req.admin = admin
        
//         next()
        
//     }catch(e){
//         res.status(401).send({error: "Please authenticate...!!!"})
//     }
// }