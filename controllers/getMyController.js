const Bid = require("../models/Bid")
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
            
            const l = await Product.find({createdby: req.member._id, type: "auction"}).select('title type photos').lean()
        
            let finalList = []
            for(let i in l){
                var t;
                if(req.member.wishlist.includes(l[i]._id)){
                    t = {...length[i], "wishlisted": true}
                }else{
                    t = {...l[i], "wishlisted": false}
                }

                const bids = await Bid.find({auction: l[i]._id}).sort({"amount": "desc"}).lean()
                t = {
                    ...t, 
                    "maxbid" : {
                        amount: bids.length!==0 ? bids[0].amount : 0,
                        placedby: bids.length!==0 ? bids[0].placedby : null
                    }
                }
                finalList.push(t)
            }

            res.status(201).send(finalList)

        }else{
            throw new Error("Only sellers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}