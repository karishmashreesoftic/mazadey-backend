const Member =  require('../../models/Member')

exports.login = async(req,res) =>{
    try{
        const member = await Member.findByCredentials(req.body.username,req.body.password)
        const token = await member.generateAuthToken()
        res.status(201).send({member, token})
    }catch(error){
        res.send({error: error.message})
    }   
}