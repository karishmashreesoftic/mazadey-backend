const jwt = require('jsonwebtoken');
const Member = require("../models/Member")
//const Admin = require('../models/Admin');


exports.auth = async (req, res, next) => {
    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let member;
        member = await Member.findOne({_id:decoded._id, 'tokens.token': token})

        if(!member){
            throw new Error("User not found !")
        }

        req.token = token
        req.member = member
        next()
        
    }catch(e){
        let msg = "Please authenticate...!!!";
        if(e.message==="User not found !"){
            msg = e.message
        }
        res.status(401).send({message: msg})
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