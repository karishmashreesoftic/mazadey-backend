const Bid = require("../models/Bid")
const Member = require("../models/Member")
const Token = require("../models/Token")
const Wishlist = require("../models/Wishlist")
const Qid = require("../models/Qid")
const Product = require("../models/Product")
const Photos = require("../models/Photos")
const Documents = require("../models/Documents")

exports.deleteAccount = async(req,res) =>{

    try{

        const products = Product.findAll(
            {
                where: {createdby: req.member._id},
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
                ]
            }
        )

        for(i in products){

            let product = products[i]

            for(let i in product.photos){
                let path = product.photos[i].ppath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Photos.destroy({where: {_id: product.photos[i]._id}})
            }
    
            for(let i in product.documents){
                let path = product.documents[i].dpath.replace(process.env.BASE_URL,"")
                unlinkSync(dirpath.join(__dirname, '../..'+path))
                await Documents.destroy({where: {_id: product.documents[i]._id}})
            }

        }

        await Qid.destroy({where: { member: req.member._id }})
        await Token.destroy({where: { member: req.member._id }})
        await Bid.destroy({where: { placedby: req.member._id }})
        await Wishlist.destroy({where: {  MemberID: req.member._id }})
        await Member.destroy({where: { _id: req.member._id }})

        res.status(200).send({message: "Account Deleted"})

    }catch(error){
        res.send({message: error.message})
    } 

}