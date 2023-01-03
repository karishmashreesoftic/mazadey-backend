const Documents = require("../../models/Documents")
const Photos = require("../../models/Photos")
const Product = require("../../models/Product")
const Wishlist = require("../../models/Wishlist")
const axios = require('axios');
const Member = require("../../models/Member");

exports.getProducts = async(req,res) =>{
    try{

        const authtoken = "tomasz@innovationnomads.com:s9TGktXDBM";
        const encodedToken = Buffer.from(authtoken).toString('base64');

        const userrole = await axios.get("https://mzadey.com/wp-json/wp/v2/users/2?context=edit",{
            headers: {
                'Authorization': 'Basic '+ encodedToken,
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })

        const roles = await userrole.data.roles

        if(roles.includes("registered_user")){
            await Member.update(
                {status: "registered"},
                {where:{_id: req.member._id}}
            )
        }

        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction")
        let items = await itemresponse.data
        items = items.data.product_list[0]
        console.log("item..",items)

        res.status(201).send(items)

    }catch(error){
        console.log("error...",error)
        res.send({message: error.message})
    }   
}

exports.getFilteredProducts = async(req,res) =>{
    try{

        const itemresponse = await axios.get("https://mzadey.com/wp-json/yith-proteo-child/v1/getallauction")
        let items = await itemresponse.data
        items = items.data.product_list[0]

        const category = req.query.category
        
        let products = []
        for(let i=0; i<items.length; i++){
            if(items[i].category===category){
                products.push(items[i])
            }
        }

        res.status(201).send(items)

    }catch(error){
        console.log("error...",error)
        res.send({message: error.message})
    }   
}