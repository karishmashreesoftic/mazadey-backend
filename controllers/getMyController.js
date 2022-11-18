const Product = require("../models/Product")

exports.getListing = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){
            
            const l = await Product.find({createdby: req.member._id, type: "ad"}).select('title type photos')
            res.status(201).send(l)

        }else{
            throw new Error("Only sellers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getAuctions = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){
            
            const l = await Product.find({createdby: req.member._id, type: "auction"}).select('title type photos')
            res.status(201).send(l)

        }else{
            throw new Error("Only sellers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}