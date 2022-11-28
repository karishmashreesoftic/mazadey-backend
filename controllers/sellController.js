const Bid = require("../models/Bid")
const Product = require("../models/Product")


exports.sell = async(req,res) =>{
    try{
        
        const bid = await Bid.findByIdAndUpdate(req.params.id, {winner : true})
        const auction = await Product.findByIdAndUpdate(bid.auction, {status: "sold", statusat: new Date(), winner: bid.placedby}, {new: true})
        
        //remove balance from customer's accont
        //add to the sellers account

        res.status(201).send(auction)

    }catch(error){
        res.send({message: error.message})
    }   
}
