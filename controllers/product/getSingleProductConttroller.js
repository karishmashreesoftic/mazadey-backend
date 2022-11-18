const Product = require("../../models/Product")


exports.getSingleAd = async(req,res) =>{
    try{

        const ad = await Product.findOne({_id : req.params.id, type:"ad"}).select('photos title description mobile email documents')
        if(!ad){
            throw new Error("No Ad Present")
        }
        res.status(201).send(ad)

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
        }).select('photos title description mobile email documents bids')

        if(!auction){
            throw new Error("No Auction Present")
        }

        res.status(201).send({
            auction,
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