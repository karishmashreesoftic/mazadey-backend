const Member =  require('../../models/Member')

exports.logout = async(req,res) =>{
    try{
        const updated_tokens = req.member.tokens.filter((token) => {
            return token.token !== req.token
        })
        await Member.findOneAndUpdate({_id: req.member._id},{tokens: updated_tokens}) 
        res.sendStatus(200)
    }catch(error){
        res.send({error: error.message})
    }   
}

exports.logoutAll = async(req,res) =>{
    try{
        await Member.findOneAndUpdate({_id: req.member._id},{tokens: []}) 
        res.status(200).send()
    }catch(error){
        res.send({error: error.message})
    }   
}