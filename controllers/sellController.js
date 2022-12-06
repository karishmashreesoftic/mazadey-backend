const Bid = require("../models/Bid")
const Product = require("../models/Product")


exports.sell = async(req,res) =>{
    try{
        
        await Bid.update({winner : true}, {where: {_id: req.params.id}})

        const bid = await Bid.findByPk(req.params.id)

        await Product.update(
            {status: "sold", statusat: new Date(), winner: bid.placedby},
            {where:{_id: bid.auction}}
        )

        const auction = await Product.findByPk(bid.auction)
        
        //remove balance from customer's accont
        //add to the sellers account

        res.status(201).send(auction)

    }catch(error){
        res.send({message: error.message})
    }   
}
