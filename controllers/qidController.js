const Qid = require("../models/Qid");

exports.uploadQid = async(req,res) =>{
    try{
        console.log("uploadQid...",req.file)
        await Qid.create({
            qpath : process.env.BASE_URL+"/uploads/"+req.file.filename, 
            member: req.member._id
        })

        res.status(200).send({message: "Success"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}
