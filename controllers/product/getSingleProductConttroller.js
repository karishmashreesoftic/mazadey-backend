const axios = require('axios');
const Member = require("../../models/Member");
const i18next = require("../../utils/i18")

exports.getSingleProduct = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error(i18next.t("pendingForActivation", {lng: req.member.applanguage}))
        }

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getsingleproduct?include=${req.params.id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let item = await itemresponse.data
        item = item.data.product_detail[0] 
        let final = {}

        if(item.auction_starting_price){
            let c = []
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
            for(let j=0; j<item.category_list.length; j++){
                let tc = item.category_list[j]
                if(tc.name){
                    c.push(tc.name)
                }
            }
            let flag = false
            if(req.wishlist.includes(item.ID)){
                flag = true
            }
            final = {
                ...item,
                category_list: c,
                bidding_list: bids,
                wishlist: flag
            }
        }else{
            let c = []
            for(let j=0; j<item.category_list.length; j++){
                let tc = item.category_list[j]
                if(tc.name){
                    c.push(tc.name)
                }
            }
            let flag = false
            if(req.wishlist.includes(item.ID)){
                flag = true
            }
            final = {
                ...item,
                category_list: c,
                wishlist: flag
            }
        }

        res.status(200).send(final)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
