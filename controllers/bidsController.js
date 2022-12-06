const Bid = require("../models/Bid")
const Member = require("../models/Member")
const Product = require("../models/Product")
const Wishlist = require("../models/Wishlist")


exports.placeBid = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){
            
            const auction = await Product.findByPk(req.body.auction)
            if(!auction){
                throw new Error("Auction not found")
            }
            if(auction.status==="sold"){
                throw new Error("Auction is over.")
            }
            if(req.body.amount < auction.minbid){
                throw new Error("Bid amount should be more than the minimum bid amount")
            }

            let data = {
                ...req.body,
                placedby: req.member._id,
            }

            const alreadyplaced = await Bid.findOne({where: {placedby: req.member._id, auction: req.body.auction}})
            let bid;
            if(alreadyplaced){
                bid = await Bid.update(data,{where: {_id: alreadyplaced._id}})
            }else{
                bid = await Bid.create(data)
            }

            res.status(201).send({amount: req.body.amount})            

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.deleteBid = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){

            await Bid.destroy({where: {_id: req.params.id}})
            res.status(200).send({message: "Success"})           

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getBids = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){

            const bids = await Bid.findAll(
                {
                    where: {
                        auction: req.params.id
                    },
                    include: [
                        {
                            model: Member,
                            as:"bidplacedby",
                            attributes: ["_id", "fullname"],
                        }
                    ],
                    order: [
                        ['amount', 'DESC'],
                    ],
                    attributes:["_id", "amount", "winner"],
                    raw: true,
                    nest: true
                }
            )

            res.status(201).send(bids)

        }else{
            throw new Error("Only sellers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getMaxBid = async(req, res) => {
    try{

        const bids = await Bid.findOne(
            {
                where: {
                    auction: req.params.id
                },
                include: [
                    {
                        model: Member,
                        as:"bidplacedby",
                        attributes: ["_id", "fullname"],
                    }
                ],
                order: [
                    ['amount', 'DESC'],
                ],
                attributes:["_id","amount"],
                raw: true,
                nest: true
            }
        )

        res.status(201).send(bids)

    }catch(error){
        res.send({message: error.message})
    }
}


exports.getMyBid = async(req, res) => {
    try{

        if(req.member.membertype==="customer"){
            
            // const bids = await Bid.find({placedby: req.member._id}).populate('auction', 'title description description').lean()

            const bids = await Bid.findAll(
                {
                    where: {
                        placedby: req.member._id
                    },
                    include: [
                        {
                            model: Product,
                            as:"bids",
                            attributes: ["_id", 'title', 'description', 'minbid'],
                        }
                    ],
                    attributes:["_id"],
                    raw: true,
                    nest: true
                }
            )

            const w = await Wishlist.findAll({
                where: {
                    MemberID: req.member._id
                },
            })

            let wishlist = []
            for(let i in w){
                wishlist.push(w[i].ProductId)
            }

            let finalBids = []
            for(let i in bids){
                var t;
                if(wishlist.includes(bids[i].bids._id)){
                    t = {...bids[i].bids, "wishlisted": true}
                }else{
                    t = {...bids[i].bids, "wishlisted": false}
                }
                finalBids.push(t)
            }

            res.status(200).send(finalBids)

        }else{
            throw new Error("Only customers are allowed to perform this action.")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}