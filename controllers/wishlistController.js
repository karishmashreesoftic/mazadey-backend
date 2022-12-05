const Product =  require('../models/Product')
const Member = require('../models/Member')
const Wishlist = require('../models/Wishlist')

exports.addToWishlist = async(req,res) => {
    try{

        await Wishlist.create({MemberID: req.member._id, ProductId: req.params.id})
        res.status(200).send({message: "Success"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.removeFromWishlist = async(req,res) => {
    try{
        await Wishlist.destroy({MemberID: req.member._id, ProductId: req.params.id})
        res.status(200).send({message: "Success"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getWishlist = async(req, res) => {
    try{
  
        const w = await Member.findByPk(req.member._id).populate('wishlist','title photos type mobile').select('wishlist')
        res.status(201).send(w.wishlist)

    }catch(error){
        res.send({message: error.message})
    }   
}