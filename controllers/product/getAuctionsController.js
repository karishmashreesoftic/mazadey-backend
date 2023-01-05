const axios = require('axios');
const Member = require("../../models/Member");

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

        if(req.member.status==="pending"){
            throw new Error("Your account is pending for activation. You will able to see items once your account is active.")
        }

        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction",{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let items = await itemresponse.data
        items = items.data.product_list[0]
        // console.log("item..",items)

        let auctions = []
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
                        let t = {
                            ...items[i],
                            category_list: c,
                            bidding_list: bids
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
                let t = {
                    ...items[i],
                    category_list: c,
                    bidding_list: bids
                }
                auctions.push(t)
            }
        }


        res.status(201).send(auctions)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
