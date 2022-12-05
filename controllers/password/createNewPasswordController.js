const Member = require("../../models/Member")
const bcrypt = require("bcryptjs");

exports.createPassword = async(req,res) => {
    try{
        const m = await Member.findOne({where: {email: req.body.email}})
        const isMatch = await bcrypt.compare(req.body.newpassword, m.password)
        if(isMatch){
            throw new Error("New Password can't be old password.")
        }else{
            await Member.update(
                {
                    password: await bcrypt.hash(req.body.newpassword, 8)
                }, 
                {
                    where : {email: req.body.email}
                } 
            )
            res.status(200).send({message: "Success"}) 
        }

    }catch(error){
        res.send({message: error.message})
    }
}
