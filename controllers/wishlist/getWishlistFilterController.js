const axios = require('axios');
const Member = require("../../models/Member");
const i18next = require("../../utils/i18")

exports.getWishlistFilter = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error(i18next.t("pendingForActivation", {lng: req.member.applanguage}))
        }

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
        const category=req.params.id
        // wishlist[0].category_list
        console.log(category);
        finalItems[0].category_list
        let a=[]
        for(let i=0;i<finalItems.length;i++)
        {
            for(let j=0;j<finalItems[i].category_list.length;j++)
            {
                if(category==="carPlateNumbers"){
                    if(finalItems[i].category_list[j]==="Car plate numbers"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="Accessories"){
                    if(finalItems[i].category_list[j]==="Accessories"){
                        a.push(bids[i]);
                    }
                }
               else if(category==="Bags"){
                    if(finalItems[i].category_list[j]==="Bags"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="Jewellery"){
                    if(finalItems[i].category_list[j]==="Jewellery"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="luxury"){
                    if(finalItems[i].category_list[j]==="Luxury &amp; Lifestyle"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="phoneNumbers"){
                    if(finalItems[i].category_list[j]==="Phone numbers"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="realEstates"){
                    if(finalItems[i].category_list[j]==="Real estates"){
                        a.push(finalItems[i]);
                    }
                }
               else if(category==="Watches"){
                    if(finalItems[i].category_list[j]==="Watches"){
                        a.push(finalItems[i]);
                    }
                }
            }
        }
        

        res.status(200).send({wishlist:a})

    }catch(error){
        res.send({message: error.message})
    }   
}