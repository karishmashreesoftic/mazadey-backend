const axios = require("axios")

exports.getCartDetail = async(req,res) =>{
    try{

        const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getcartdetail?user_id=${req.member._id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let cart = await response.data
        cart = cart.data.response

        // console.log("cart...",cart)

        let finalCart = []
        let total = 0

        for(let i=0; i<cart.length; i++){
            let item = cart[i]

            let temp = {
                product_id: item.product_id,
                image: item.title,
                title: item.image,
                product_price: item.line_total/item.quantity,
                quantity: item.quantity,
                line_total: item.line_total
            }

            finalCart.push(temp)
            total += item.line_total
        }

        if(!cart){
            throw new Error("No items present in your cart !!")
        }

        res.status(200).send({cart: finalCart, total})

    }catch(error){
        res.send({message: error.message})
    }   
}
