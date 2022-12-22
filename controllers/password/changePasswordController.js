const Member = require("../../models/Member")
const bcrypt = require("bcryptjs");

exports.changePassword = async(req,res) => {
    try{

        const isMatch = await bcrypt.compare(req.body.oldpassword, req.member.password)
        if(isMatch){
            const member = await Member.update(
                {
                    password: await bcrypt.hash(req.body.password, 8)
                }, 
                {
                    where : {_id : req.member._id}
                } 
            )
            res.status(201).send(member)
        }else{
            throw new Error("Old password doesn't match. Please type correct password !")
        }

    }catch(error){
        res.send({message: error.message})
    }
}
