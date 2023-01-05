const axios = require('axios');

exports.getProducts = async(req,res) =>{
    try{

        if(req.member.status==="pending"){
            throw new Error("Your account is pending for activation. You will able to see items once your account is active.")
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
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
