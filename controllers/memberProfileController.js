const Member = require("../models/Member")


exports.getProfile = async(req,res) => {
    try{

        const user = {
            _id : req.member._id,
            fullname: req.member.fullname,
            mobile: req.member.mobile,
            email: req.member.email,
            status: req.member.status,
            type: req.member.membertype
        }

        res.status(201).send(user)

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.editProfile = async(req,res) => {
    try{

        const user = await Member.findByIdAndUpdate(req.member._id, req.body, {new: true}).select("fullname mobile email status")
        res.status(201).send(user)

    }catch(error){
        res.send({message: error.message})
    }   
}