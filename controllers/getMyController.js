const Bid = require("../models/Bid")
const Member = require("../models/Member")
const Photos = require("../models/Photos")
const Product = require("../models/Product")
const Wishlist = require("../models/Wishlist")

exports.getListing = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){
            
            const l = await Product.findAll(
                {
                    where :{createdby: req.member._id, type: "ad"},
                    include: [
                        {
                            model: Photos,
                            as: "photos",
                            attributes: ['ppath']
                        }
                    ],
                    attributes: ["title", "type", "_id"]
                }
            )

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

            const l = await Product.findAll(
                {
                    where :{createdby: req.member._id, type: "auction"},
                    include: [
                        {
                            model: Photos,
                            as: "photos",
                            attributes: ['ppath']
                        }
                    ],
                    attributes: ["title", "type", "_id"],
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
        
            let finalList = []
            for(let i in l){
                var t;
                if(wishlist.includes(l[i]._id)){
                    t = {...l[i], "wishlisted": true}
                }else{
                    t = {...l[i], "wishlisted": false}
                }

                const bids = await Bid.findOne(
                    {
                        where: {
                            auction: l[i]._id
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
                t = {
                    ...t, 
                    "maxbid" : {
                        amount: bids ? bids.amount : 0,
                        placedby: bids ? bids.bidplacedby._id : null
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