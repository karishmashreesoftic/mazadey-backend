const Member =  require('../../models/Member')

exports.login = async(req,res) =>{
    try{
        const member = await Member.findByCredentials(req.body.email,req.body.password)
        const token = await member.generateAuthToken()
        res.status(201).send({member, token,message: "Login Successful"})
    }catch(error){
        res.send({message: error.message})
    }   
}