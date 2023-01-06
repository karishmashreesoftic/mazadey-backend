const axios = require("axios")

exports.addToWishlist = async(req,res) =>{
    try{

        const wishlistres = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/additeminwishlist?user_id=${req.member._id}&&product_id=${req.body.itemid}&&product_price=${req.body.itemprice}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let wishlist = await wishlistres.data
        console.log("wishlist..",wishlist)

        res.status(201).send({message: wishlist})

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.removeFromWishlist = async(req,res) =>{
    try{

        const wishlistres = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/removeitemfromwishlist?user_id=${req.member._id}&&product_id=${req.params.id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let wishlist = await wishlistres.data
        console.log("wishlist..",wishlist)

        res.status(201).send({message: wishlist})

    }catch(error){
        res.send({message: error.message})
    }   
}