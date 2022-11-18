const jwt = require('jsonwebtoken');
const Member = require("../models/Member")
//const Admin = require('../models/Admin');


exports.auth = async (req, res, next) => {
    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let member;
        member = await Member.findOne({_id:decoded._id, 'tokens.token': token})

        req.token = token
        req.member = member
        next()
        
    }catch(e){
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