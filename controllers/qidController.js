const Member = require("../models/Member")
const crypto = require("crypto");

exports.uploadQid = async(req,res) =>{
    try{
        console.log("uploadQid..req.file..",req.file)
        const q = {
            qpath: process.env.BASE_URL+"/uploads/"+req.file.filename
        }
        console.log("q...",q)
        await Member.findByIdAndUpdate(req.member._id, {qid: q})
        res.status(200).send({message: "Success"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}
