const Product = require("../../models/Product")

exports.getProducts = async(req,res) =>{
    try{
        console.log(req.query.type)
        const products = await Product.find({status: "live", type: req.query.type})
        if(products.length===0){
            throw new Error("No Items Available")
        }
        res.status(201).send(products)

    }catch(error){
        res.send({error: error.message})
    }   
}