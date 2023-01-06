const axios = require('axios');
const i18next = require("../../utils/i18")

exports.getProducts = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error(i18next.t("pendingForActivation", {lng: req.member.applanguage}))
        }

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

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
                        let flag = false
                        if(req.wishlist.includes(items[i].ID)){
                            flag = true
                        }
                        let t = {
                            ...items[i],
                            category_list: c,
                            wishlist: flag
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
                let flag = false
                if(req.wishlist.includes(items[i].ID)){
                    flag = true
                }
                let t = {
                    ...items[i],
                    category_list: c,
                    wishlist: flag
                }
                products.push(t)
            }
        }

        res.status(201).send(products)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
