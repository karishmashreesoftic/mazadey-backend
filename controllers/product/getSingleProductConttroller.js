const Product = require("../../models/Product")


exports.getSingleAd = async(req,res) =>{
    try{

        const ad = await Product.findOne({_id : req.params.id, type:"ad"}).select('photos title description mobile email documents price').lean()
        if(!ad){
            throw new Error("No Ad Present")
        }
        var tempad;
        if(req.member.wishlist.includes(ad._id)){
            tempad = {...ad, "wishlisted": true}
        }else{
            tempad = {...ad, "wishlisted": false}
        }
      
        res.status(201).send(tempad)

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getSingleAuction = async(req,res) =>{
    try{

        const auction = await Product.findById({_id : req.params.id, type:"auction"}).populate({
            path: 'bids',
            select: 'placedby amount',
            populate: {path: 'placedby', select: "fullname"}
        }).select('photos title description mobile email documents bids').lean()

        if(!auction){
            throw new Error("No Auction Present")
        }

        var tempauction;
        if(req.member.wishlist.includes(auction._id)){
            tempauction = {...auction, "wishlisted": true}
        }else{
            tempauction = {...auction, "wishlisted": false}
        }

        res.status(201).send({
            auction: tempauction,
            biddescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis"
        })

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getMyAuction = async(req,res) =>{
    try{    
        if(req.member.membertype==="seller"){
            const auction = await Product.findById({_id : req.params.id, type:"auction"}).select('photos title description documents')

            if(!auction){
                throw new Error("No Auction Present")
            }
            res.status(201).send(auction)
        }else{
            throw new Error("Only sellers can perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}