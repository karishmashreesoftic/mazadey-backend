const validatePhoneNumber = require('validate-phone-number-node-js');
const validator = require("validator");
var FormData = require('form-data');
const axios = require('axios');
const fs = require("fs")
const i18next = require("../../utils/i18")

exports.createAd = async(req, res) => {
    try{

        if(req.body.email){
            if (!validator.isEmail(req.body.email)) {
                throw new Error(i18next.t("emailInvalid", {lng: req.member.applanguage}))
              }
        }
        if(req.body.mobile){
            if(!req.body.mobile.includes("+")){
                throw new Error(i18next.t("mobileCodeError", {lng: req.member.applanguage}))
            }else if(!validatePhoneNumber.validate(req.body.mobile)){
                throw new Error(i18next.t("mobileInvalid", {lng: req.member.applanguage}))
            }
        }
        if(req.files.length===0){
            throw new Error(i18next.t("noPhotosSelected", {lng: req.member.applanguage}))
        }

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');
        let photos = []
        let photosurl = []

        for(let i=0; i<req.files.length; i++){

            let tfile = fs.createReadStream(req.files[i].path)
            let pdata = new FormData()
            pdata.append("file", tfile)
    
            let presponse = await axios.post("https://mzadey.com/wp-json/wp/v2/media", pdata, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': 'Basic '+ encodedToken
                }
            })
    
            let photoid = await presponse.data
            // console.log("photoid...",photoid)
            photos.push(photoid.id)
            photosurl.push(photoid.guid.rendered)
            fs.unlinkSync(req.files[i].path)
        }

        let productdata = new FormData()
        productdata.append("item_meta[73]", req.body.type) //Type
        if(req.body.type==="E-Auction"){
            productdata.append("item_meta[42]", req.body.startbid) //Starting Bid
            productdata.append("item_meta[43]", req.body.minbid) //Minimum Bid
            productdata.append("item_meta[76]", req.body.time) //Time
        }else{
            productdata.append("item_meta[74]", req.body.price) //Price
        }
        productdata.append("item_meta[45]", req.body.category) //Category
        productdata.append("item_meta[44]", req.body.acquire) //From where you acquire
        productdata.append("item_meta[41]", req.body.description) //Description
        productdata.append("item_meta[65]", req.body.firstname) //First Name
        productdata.append("item_meta[66]", req.body.lastname) //Last Name
        productdata.append("item_meta[68]", req.body.email) //Email
        productdata.append("item_meta[69]", req.body.mobile) //Mobile
        // productdata.append("item_meta[71]", req.body.otp) //OTP
        console.log("photos...",photos)
        for(let i=0; i<photos.length; i++){
            productdata.append("item_meta[46][]", photos[i]) //Photos
        }

        const productresponse = await axios.post("https://mzadey.com/wp-json/frm/v2/forms/7/entries", productdata, {
            headers: {
                "Content-Type": "multipart/form-data;",
                "Accept-Encoding": "gzip,deflate,compress",
                'Authorization': 'Basic '+ encodedToken,
                "Cookie" : "transient_key=f; wp-wpml_current_admin_language_d41d8cd98f00b204e9800998ecf8427e=en"
            },
        });
        
        const product = await productresponse.data
        // console.log("product..",product)

        let p = {
            id: product.id,
            type: req.body.type,
            category: req.body.category,
            acquire: req.body.acquire,
            description: req.body.description,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            photos: photosurl
        }
        if(req.body.type==="E-Auction"){
            p = {
                ...p,
                startbid: req.body.startbid,
                minbid: req.body.minbid,
                time: req.body.time,
            }
        }else{
            p = {
                ...p,
                price: req.body.price,
            }
        }

        res.status(201).send(p)

    }catch(error){
        let m;
        if(error.response && error.response.data.code==="frmapi_validate_entry"){
            m = Object.values(error.response.data.message)
        }else{
            m = error.message
        }
        console.log("error...",m)
        res.send({message: m})
    }
}