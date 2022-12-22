const Bid = require("../../models/Bid")
const Documents = require("../../models/Documents")
const Member = require("../../models/Member")
const Photos = require("../../models/Photos")
const Product = require("../../models/Product")
const Wishlist = require("../../models/Wishlist")


exports.getSingleAd = async(req,res) =>{
    try{

        const ad = await Product.findOne({
            where: {
                _id : req.params.id,
                type:"ad"
            },
            include: [
                {
                    model: Photos,
                    as: "photos",
                    attributes: ['ppath']
                },
                {
                    model: Documents,
                    as: "documents",
                    attributes: ['dpath']
                }
            ],
            attributes:["_id", "title", "description", "mobile", "email", "price"],
            raw: true,
            nest: true
        })

        if(!ad){
            throw new Error("No Ad Present")
        }

        const w = await Wishlist.findAll({
            where: {
                MemberID: req.member._id
            },
        })

        let wishlist = []
        for(let i in w){
            wishlist.push(w[i].ProductId)
        }


        var tempad;
        if(wishlist.includes(ad._id)){
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
        const auction = await Product.findOne({
            where: {
                _id : req.params.id,
                type:"auction"
            },
            include: [
                {
                    model: Photos,
                    as: "photos",
                    attributes: ['ppath']
                },
                {
                    model: Documents,
                    as: "documents",
                    attributes: ['dpath']
                },
            ],
            attributes:["_id", "title", "description", "mobile", "email", "minbid"],
            raw: true,
            nest: true
        })

        if(!auction){
            throw new Error("No Auction Present")
        }

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
                attributes:["_id","amount"],
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

        var tempauction;
        if(wishlist.includes(auction._id)){
            tempauction = {...auction, "bids": bids, "wishlisted": true}
        }else{
            tempauction = {...auction, "bids": bids, "wishlisted": false}
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

            const auction = await Product.findOne({
                where: {
                    _id : req.params.id,
                    type:"auction"
                },
                include: [
                    {
                        model: Photos,
                        as: "photos",
                        attributes: ['ppath']
                    },
                    {
                        model: Documents,
                        as: "documents",
                        attributes: ['dpath']
                    },
                ],
                attributes:["_id", "title", "description"],
                raw: true,
                nest: true
            })

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