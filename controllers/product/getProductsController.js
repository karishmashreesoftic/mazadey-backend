const Product = require("../../models/Product")

exports.getProducts = async(req,res) =>{
    try{
        const products = await Product.find({status: "live", type: req.query.type}).lean()
        if(products.length===0){
            throw new Error("No Items Available")
        }

        let finalProducts = []
        for(let i in products){
            var t;
            if(req.member.wishlist.includes(products[i]._id)){
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