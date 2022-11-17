const Bid = require("../models/Bid")
const Product = require("../models/Product")


exports.placeBid = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){
            
            const auction = await Product.findById(req.body.auction)
            if(!auction){
                throw new Error("Auction not found")
            }
            if(req.body.amount < auction.minbid){
                throw new Error("Bid amount should be more than the minimum bid amount")
            }

            let data = {
                ...req.body,
                placedby: req.member._id,
                createdat: new Date()
            }

            const alreadyplaced = await Bid.findOne({placedby: req.member._id, auction: req.body.auction})
            if(alreadyplaced){
                await Bid.findByIdAndUpdate(alreadyplaced._id, data)
            }else{
                const newBid = new Bid(data)
                await newBid.save()
            }

            const bids = await Bid.find({auction: req.body.auction}).sort({"amount": "desc"})
            let bidlist = []
            for(let i=0; i< bids.length; i++){
                bidlist.push(bids[i]._id)
            }

            await Product.findByIdAndUpdate(req.body.auction, {bids: bidlist}, {new: true})

            res.status(201).send({amount: req.body.amount})            

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({error: error.message})
    }   
}

exports.deleteBid = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){
            
            await Bid.findByIdAndDelete(req.params.id)

            const bids = await Bid.find({auction: bid.auction}).sort({"amount": "desc"})
            let bidlist = []
            for(let i=0; i< bids.length; i++){
                bidlist.push(bids[i]._id)
            }

            await Product.findByIdAndUpdate(req.body.auction, {bids: bidlist}, {new: true})

            res.sendStatus(200)           

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({error: error.message})
    }   
}

exports.getBids = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){
   
            const bids = await Bid.find({auction: req.params.id}).sort({"amount": "desc"}).populate('placedby', 'fullname').select('amount placedby')
            res.status(201).send(bids)

        }else{
            throw new Error("Only sellers are allowed to perform this action.")
        }

    }catch(error){
        res.send({error: error.message})
    }   
}

exports.getMaxBid = async(req, res) => {
    try{

        const auction = await Product.findById(req.params.id).select("bids").populate({
            path: "bids",
            select: "placedby amount",
            populate: {path: 'placedby', select: "fullname"}
        })
        res.status(201).send(auction.bids[0])

    }catch(error){
        res.send({error: error.message})
    }
}