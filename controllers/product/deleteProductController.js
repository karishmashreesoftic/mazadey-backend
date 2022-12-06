const { unlinkSync } = require("fs-extra")
const { ObjectId } = require("mongodb")
const Bid = require("../../models/Bid")
const Documents = require("../../models/Documents")
const Photos = require("../../models/Photos")
const Product = require("../../models/Product")
const dirpath = require("path")
const Wishlist = require("../../models/Wishlist")

exports.deleteAd = async(req,res) =>{
    try{

        if(req.member.membertype==="seller"){

            const ad = await Product.findByPk(
                req.params.id,
                {
                    include: [
                        {
                            model: Photos,
                            as: "photos",
                            attributes: ['ppath',"_id"]
                        },
                        {
                            model: Documents,
                            as: "documents",
                            attributes: ['dpath',"_id"]
                        },
                    ],
                }
            )

            
            if(!ad){
                throw new Error("No Ad Found")
            }

            for(let i in ad.photos){
                let path = ad.photos[i].ppath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Photos.destroy({where: {_id: ad.photos[i]._id}})
            }

            for(let i in ad.documents){
                let path = ad.documents[i].dpath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Documents.destroy({where: {_id: ad.documents[i]._id}})
            }

            await Wishlist.destroy({where: {ProductId: req.params.id}})
            await Product.destroy({where: {_id: req.params.id}})
            
            res.status(200).send({message: "Success"}) 

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.deleteAuction = async(req,res) =>{
    try{
        
        if(req.member.membertype==="seller"){

            const auction = await Product.findByPk(
                req.params.id,
                {
                    include: [
                        {
                            model: Photos,
                            as: "photos",
                            attributes: ['ppath',"_id"]
                        },
                        {
                            model: Documents,
                            as: "documents",
                            attributes: ['dpath',"_id"]
                        },
                    ],
                }
            )

            
            if(!auction){
                throw new Error("No Auction Found")
            }

            for(let i in auction.photos){
                let path = auction.photos[i].ppath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Photos.destroy({where: {_id: auction.photos[i]._id}})
            }

            for(let i in auction.documents){
                let path = auction.documents[i].dpath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Documents.destroy({where: {_id: auction.documents[i]._id}})
            }

            await Bid.destroy({where: {auction: req.params.id}})
            await Wishlist.destroy({where: {ProductId: req.params.id}})
            await Product.destroy({where: {_id: req.params.id}})

            res.status(200).send({message: "Success"}) 

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }

    }catch(error){
        res.send({message: error.message})
    }   
}