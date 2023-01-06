const Member = require("../models/Member");


exports.setLang = async(req,res) => {

    try{
        
        const lang = await Member.update(                
                                    {applanguage: req.body.language},
                                    {where:{_id: req.member._id}}
                                )
        res.status(201).send({language : req.body.language})

    }catch(error){
        res.send({error: error.message})
    }

}

exports.getLang = async(req,res) => {

    try{
        
        res.status(201).send({language : req.member.applanguage})

    }catch(error){
        res.send({error: error.message})
    }

}