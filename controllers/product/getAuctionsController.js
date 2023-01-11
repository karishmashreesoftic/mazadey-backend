const axios = require('axios');
const Member = require("../../models/Member");
const i18next = require("../../utils/i18")

exports.getAuctions = async(req,res) =>{
    try{

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

        // const userrole = await axios.get("https://mzadey.com/wp-json/wp/v2/users/2?context=edit",{
        //     headers: {
        //         'Authorization': 'Basic '+ encodedToken,
        //         "Accept-Encoding": "gzip,deflate,compress"
        //     }
        // })

        // const roles = await userrole.data.roles

        console.log("..........req.wishlist..........",req.wishlist)

       
        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction",{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let items = await itemresponse.data
        items = items.data.product_list[0]
        // console.log("item..",items)

        let auctions = []
        if(req.member.status==="pending"){
            auctions.push({"pending":true});
        }else{
            auctions.push({"pending":false});
        }

        if(req.body.category){

            for(let i=0; i<items.length; i++){
                let ids = []
                let c = []
                let bids = []
                const b = items[i].bidding_list
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
                for(let j=0; j<items[i].category_list.length; j++){
                    let tc = items[i].category_list[j]
                    if(tc.name){
                        c.push(tc.name)
                    }
                }
                for(let k=0; k<req.body.category.length; k++){
                    if(c.includes(req.body.category[k]) && !ids.includes(items[i].ID)){
                        let flag = false
                        if(req.wishlist.includes(items[i].ID)){
                            flag = true
                        }
                        let t = {
                            ...items[i],
                            category_list: c,
                            bidding_list: bids,
                            wishlist: flag
                        }
                        auctions.push(t)
                        ids.push(t.ID)
                    }
                }
            }
            
        }else{
            for(let i=0; i<items.length; i++){
                let c = []
                let bids = []
                const b = items[i].bidding_list
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
                for(let j=0; j<items[i].category_list.length; j++){
                    let tc = items[i].category_list[j]
                    if(tc.name){
                        c.push(tc.name)
                    }
                }
                let flag = false
                if(req.wishlist.includes(items[i].ID)){
                    flag = true
                }
                let t = {
                    ...items[i],
                    category_list: c,
                    bidding_list: bids,
                    wishlist: flag
                }
                auctions.push(t)
            }
        }
        let a=[]
        for(let i=1;i<auctions.length;i++){
            a.push(auctions[i]);
        }
     
        let data={
            "pending":auctions[0].pending,
            "auctions":a
        }

        res.status(201).send(data)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
