const Documents = require("../../models/Documents")
const Photos = require("../../models/Photos")
const Product = require("../../models/Product")
const Wishlist = require("../../models/Wishlist")

exports.getProducts = async(req,res) =>{
    try{

        const products = await Product.findAll(
            {
                where :{status: "live", type: req.query.type},
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
                // attributes: ["title", "type", "_id"],
                raw: true,
                nest: true
            }
        )

        if(products.length===0){
            throw new Error("No Items Available")
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

        let finalProducts = []
        for(let i in products){
            var t;
            if(wishlist.includes(products[i]._id)){
                t = {...products[i], "wishlisted": true}
            }else{
                t = {...products[i], "wishlisted": false}
            }
            finalProducts.push(t)
        }

        res.status(201).send(finalProducts)

    }catch(error){
        res.send({message: error.message})
    }   
}