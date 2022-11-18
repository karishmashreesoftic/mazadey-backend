const Member =  require('../../models/Member')

exports.logout = async(req,res) =>{
    try{
        const updated_tokens = req.member.tokens.filter((token) => {
            return token.token !== req.token
        })
        await Member.findOneAndUpdate({_id: req.member._id},{tokens: updated_tokens}) 
        res.status(200).send({message: "Logout Successful"}) 
    }catch(error){
        res.send({message: error.message})
    }   
}

exports.logoutAll = async(req,res) =>{
    try{
        await Member.findOneAndUpdate({_id: req.member._id},{tokens: []}) 
        res.status(200).send()
    }catch(error){
        res.send({message: error.message})
    }   
}