const Documents = require("../../models/Documents")
const Photos = require("../../models/Photos")
const Product = require("../../models/Product")
const Wishlist = require("../../models/Wishlist")
const axios = require('axios');
const Member = require("../../models/Member");

exports.getAuctions = async(req,res) =>{
    try{

        const authtoken = "tomasz@innovationnomads.com:s9TGktXDBM";
        const encodedToken = Buffer.from(authtoken).toString('base64');

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
        console.log("error...",error)
        res.send({message: error.message})
    }   
}

exports.getProducts = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error("Your account is pending for activation. You will able to see items once your account is active.")
        }

        const authtoken = "tomasz@innovationnomads.com:s9TGktXDBM";
        const encodedToken = Buffer.from(authtoken).toString('base64');

        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallproducts",{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let items = await itemresponse.data
        items = items.data.product_list[0]
        // console.log("item..",items)
        let products = []

        if(req.body.category){

            for(let i=0; i<items.length; i++){
                let ids = []
                let c = []
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
                            category_list: c
                        }
                        products.push(t)
                        ids.push(t.ID)
                    }
                }
            }
            
        }else{
            for(let i=0; i<items.length; i++){
                let c = []
                for(let j=0; j<items[i].category_list.length; j++){
                    let tc = items[i].category_list[j]
                    if(tc.name){
                        c.push(tc.name)
                    }
                }
                let t = {
                    ...items[i],
                    category_list: c
                }
                products.push(t)
            }
        }

        res.status(201).send(products)

    }catch(error){
        console.log("error...",error)
        res.send({message: error.message})
    }   
}


exports.getSingleProduct = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error("Your account is pending for activation. You will able to see items once your account is active.")
        }

        const authtoken = "tomasz@innovationnomads.com:s9TGktXDBM";
        const encodedToken = Buffer.from(authtoken).toString('base64');

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
            final = {
                ...item,
                category_list: c,
                bidding_list: bids
            }
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
                category_list: c
            }
        }

        res.status(200).send(final)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
