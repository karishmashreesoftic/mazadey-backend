const axios = require("axios")
const Member = require("../models/Member")

exports.placeBid = async(req,res) =>{
    try{

        const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/placebid?user_id=${req.member._id}&auction_id=${req.body.auction}&bid_price=${req.body.amount}`, { 
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const data = await response.data

        res.status(200).send({message: data})

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getMyBid = async(req,res) =>{
    try{

        const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getmybidlist?user_id=${req.member._id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let tempbids = await response.data
        tempbids = tempbids.data.response

        let bids = []

        for(let i=0; i< tempbids.length; i++){

            const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getsingleproduct?include=${tempbids[i].auction_id}`,{
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
            
            let t = {
                ...tempbids[i],
                auction: final,
                name: req.member.fullname
            }

            bids.push(t)
        }

        res.status(200).send({bids})

    }catch(error){
        res.send({message: error.message})
    }   
}

