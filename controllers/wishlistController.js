const Product =  require('../models/Product')
const Member = require('../models/Member')
const Wishlist = require('../models/Wishlist')
const Photos = require('../models/Photos')

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
        await Wishlist.destroy({where: {MemberID: req.member._id, ProductId: req.params.id}})
        res.status(200).send({message: "Success"}) 

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getWishlist = async(req, res) => {
    try{
  
        const member = await Member.findByPk(
            req.member._id,
            {
                include: [
                    {
                        model: Product,
                        as: "wishlist",
                        attributes: ["_id","title", "type", "mobile"],
                        include: [
                            {
                                model: Photos,
                                as: "photos",
                                attributes: ['ppath']
                            }
                        ]
                    }
                ]
            }
        );
        res.status(201).send({wishlist: member.wishlist})

    }catch(error){
        res.send({message: error.message})
    }   
}