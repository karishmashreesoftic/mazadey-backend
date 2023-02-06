const axios = require("axios")
const Member = require("../models/Member")
const i18next = require("../utils/i18")

exports.placeBid = async(req,res) =>{
    try{

        const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getsingleproduct?include=${req.body.auction}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
      
       const itemdata=await itemresponse.data
     
        let product=itemdata.data.product_detail
        
      
        let tmp1 = Date.parse(product[0].auction_from)
        let tmp2=Date.parse(product[0].auction_to)
        
        let tmp=Date.now()
        
        if(tmp>=tmp1 && tmp<=tmp2)
        {
            const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/placebid?user_id=${req.member._id}&auction_id=${req.body.auction}&bid_price=${req.body.amount}`, { 
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress"
                }
            })
            const data = await response.data
            
            res.status(200).send({message: data})



        }else{
           
            throw new Error(i18next.t("Auction Has Ended", {lng: req.member.applanguage}))

        }


       

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.getMyBid = async(req,res) =>{
    
    try{

        let response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getmybidlist?user_id=${req.member._id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        
        let tempbids = await response.data
        tempbids = tempbids.data.response
        
        let bids = []

        const itemresponsee = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction",{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })

        let auctionid=[]

        let items = await itemresponsee.data
        items = items.data.product_list[0]
       
        let flag=false;
        for (let i = 0; i < items.length; i++) {
           auctionid.push(items[i].ID);
            
        }
      
        for(let i=0; i< tempbids.length; i++){


            let id=tempbids[i].auction_id;
            let flag=false;
            for (let i = 0; i < auctionid.length; i++) {
                const element = auctionid[i];
                if(element==id){
                    flag=true;
                    break;
                }
            }
           
           
            if(flag){

            

            const itemresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getsingleproduct?include=${id}`,{
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress"
                }
            })
        
            let item = await itemresponse.data
            item = item.data.product_detail[0] 
            
            let final = {}

            if(item.auction_starting_price!==0){
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
                let tmp=req.wishlist;
                // console.log("....................done....................1");
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i]==item.ID){
                        
                        flag = true
                    }
                }
                // console.log("....................done....................2");

                final = {
                    ...item,
                    category_list: c,
                    bidding_list: bids,
                    wishlist: flag
                }
                // console.log("....................done....................3");

            }else{
                let c = []
                for(let j=0; j<item.category_list.length; j++){
                    let tc = item.category_list[j]
                    if(tc.name){
                        c.push(tc.name)
                    }
                }
                // console.log("....................done....................4");

                let flag = false
                let tmp=req.wishlist;
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i]==item.ID){
                        
                        flag = true
                    }
                }
                // console.log("....................done....................5");

                final = {
                    ...item,
                    category_list: c,
                    wishlist: flag
                }
                // console.log("....................done....................6");

            }
            
            let t = {
                ...tempbids[i],
                auction: final,
                name: req.member.fullname
            }
            // console.log("....................done....................7");


            bids.push(t)
            }
    }

        // console.log("....................done....................8");
        for (let i = 0; i < bids.length; i++) {

            let tmp1 = Date.parse(bids[i].auction.auction_from)
            let tmp2=Date.parse(bids[i].auction.auction_to)
            let tmp=Date.now()
            let isEnded=true;
            if(tmp>=tmp1 && tmp<=tmp2){
               isEnded=false;
            }
            bids[i]={
                ...bids[i],
                isEnded:isEnded
            }

            
        }
      

        // console.log("..................bids...................");
        // console.log(bids);

        res.status(200).send({bids})

    }catch(error){
        res.send({message: error.response})
    }   
}


