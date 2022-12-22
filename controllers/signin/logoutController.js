const Member =  require('../../models/Member')
const Token = require('../../models/Token')

exports.logout = async(req,res) =>{
    try{

        await Token.destroy({where: {token: req.token}})
        res.status(200).send({message: "Logout Successful"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.logoutAll = async(req,res) =>{
    try{

        await Token.destroy({where: {member: req.member._id}})
        res.status(200).send({message: "Logout from all devices"})

    }catch(error){
        res.send({message: error.message})
    }   
}