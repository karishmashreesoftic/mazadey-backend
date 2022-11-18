const Product =  require('../models/Product')
const Member = require('../models/Member')

exports.addToWishlist = async(req,res) => {
    try{

        if(req.member.membertype==="customer"){

            const newWishlist = req.member.wishlist.concat(req.params.id)
            await Member.findByIdAndUpdate(req.member._id, {wishlist: newWishlist})
            res.status(200).send({message: "Success"}) 

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.removeFromWishlist = async(req,res) => {
    try{

        if(req.member.membertype==="customer"){

            const newWishlist = req.member.wishlist.filter((i)=> {return i.toString() !== req.params.id})
            await Member.findByIdAndUpdate(req.member._id, {wishlist: newWishlist})
            res.status(200).send({message: "Success"}) 

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getWishlist = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){
            
            const w = await Member.findById(req.member._id).populate('wishlist','title photos type').select('wishlist')
            res.status(201).send(w.wishlist)

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}