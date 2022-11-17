const Member = require("../models/Member")
const crypto = require("crypto");

exports.uploadQid = async(req,res) =>{
    try{
        console.log("uploadQid...req.file..",req.file)
        // const url = process.env.BASE_URL+"/file/"+req.file.id.toString()
        const id = crypto.randomBytes(16).toString("hex");
        const q = {
            qpath: "/uploads/"+id+req.file.originalname
        }
        console.log("q...",q)
        await Member.findByIdAndUpdate(req.member._id, {qid: q})
        res.sendStatus(200)

    }catch(error){
        res.send({error: error.message})
    }   
}
