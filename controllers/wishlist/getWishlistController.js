const axios = require('axios');
const Member = require("../../models/Member");
const i18next = require("../../utils/i18")

exports.getWishlist = async(req,res) =>{
    try{

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getallwishlist?user_id=${req.member._id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let items = await itemresponse.data
        items = items.data.wishlist

        let finalItems = []

        if(items[0].message){
            throw new Error("No Item Found")
        }
            for(let i=0; i<items.length; i++){

                let item = items[i]
    
                if(item.auction_starting_price){
                    
                    let bids = []
                    const b = item.bidding_list
                    if(b.length>0){
                        for(let i=0; i< b.length; i++){
                            const user = await Member.findByPk(b[i].user_id)
                            if(user){
                                let t = {
                                    ...b[i],
                                    name: user.fullname
                                }
                                bids.push(t)
                            }
                        }
                    }
    
                    let c = []
                    for(let j=0; j<item.category_list.length; j++){
                        let tc = item.category_list[j]
                        if(tc.name){
                            c.push(tc.name)
                        }
                    }
    
                    final = {
                        ...item,
                        type: "auction",
                        category_list: c,
                        bidding_list: bids
                    }
    
                    finalItems.push(final)
    
                }else{
                    let c = []
                    for(let j=0; j<item.category_list.length; j++){
                        let tc = item.category_list[j]
                        if(tc.name){
                            c.push(tc.name)
                        }
                    }
                    final = {
                        ...item,
                        type: "ad",
                        category_list: c
                    }
                    finalItems.push(final)
                }
    
        }
        let s=false;
        if(req.member.status==="pending"){
          s=true;
        }
        console.log(req.member._id);
        res.status(200).send({pending:s,wishlist: finalItems})

    }catch(error){
       
        res.send({message: error.message})
    }   
}