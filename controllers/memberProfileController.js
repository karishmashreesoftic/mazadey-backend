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

        const row = await Member.update(
            req.body, 
            {
                where: {_id : req.member._id },
            }
        )
        if(row[0]===1){
            const member = await Member.findByPk(
                req.member._id,
                {attributes: ['_id', 'fullname', 'mobile', 'email', 'status']}
            );
            res.status(201).send(member)
        }else{
            throw new Error("Member not found !")
        }
        

    }catch(error){
        res.send({message: error.message})
    }   
}