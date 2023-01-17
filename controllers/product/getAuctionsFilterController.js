const axios = require('axios');
const Member = require("../../models/Member");
const i18next = require("../../utils/i18")

exports.getAuctionsFilter = async(req,res) =>{
    try{

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

        // const userrole = await axios.get("https://mzadey.com/wp-json/wp/v2/users/2?context=edit",{
        //     headers: {
        //         'Authorization': 'Basic '+ encodedToken,
        //         "Accept-Encoding": "gzip,deflate,compress"
        //     }
        // })

        // const roles = await userrole.data.roles

        // console.log("..........req.wishlist..........",req.wishlist)

       
        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction",{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const category=req.params.id
        // console.log(category);
        let items = await itemresponse.data
        items = items.data.product_list[0]
        // console.log("item..",items)

        let auctions=[];
        let status;
        if(req.member.status==="pending"){
            status=true
        }else{
            status=false
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
                                name: user.fullname,
                               
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
        let a=[];
        for(let i=0;i<auctions.length;i++){
            for(let j=0;j<auctions[i].category_list.length;j++){

            
            if(category==="carPlateNumbers"){

                if(auctions[i].category_list[j]==="Car plate numbers"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="Accessories"){
                if(auctions[i].category_list[j]==="Accessories"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="Bags"){

                if(auctions[i].category_list[j]==="Bags"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="Jewellery"){
                if(auctions[i].category_list[j]==="Jewellery"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="luxury"){
                if(auctions[i].category_list[j]==="Luxury &amp; Lifestyle"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="phoneNumbers"){
                if(auctions[i].category_list[j]==="Phone numbers"){
                    a.push(auctions[i]);
                }
            }
          else  if(category==="realEstates"){
                if(auctions[i].category_list[j]==="Real estates"){
                    a.push(auctions[i]);
                }
            }
           else if(category==="Watches"){
                if(auctions[i].category_list[j]==="Watches"){
                    a.push(auctions[i]);
                }
            }
            
        }
            
        }
       
     
        let data={
            "pending":status,
            "auctions":a
        }

        res.status(201).send(data)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
