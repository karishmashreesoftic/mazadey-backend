const Product = require("../../models/Product")
const validatePhoneNumber = require('validate-phone-number-node-js');
const crypto = require("crypto");
const validator = require("validator")

exports.createAd = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){

            if(req.body.email){
                if (!validator.isEmail(req.body.email)) {
                    throw new Error("Enter a valid Email Address");
                  }
            }
            if(req.body.mobile){
                if(!validatePhoneNumber.validate(req.body.mobile)){
                    throw new Error("Enter a valid Mobile Number");  
                }
            }

            let photos = []
            let documents = []
            console.log("...",JSON.stringify(req.files))
            if(req.files.photos){
                for(let i=0; i<req.files.photos.length; i++){
                    let file = req.files.photos[i]
                    const photo = {
                        ppath: process.env.BASE_URL+"/uploads/"+file.filename
                    }
                    photos.push(photo)
                }
            }
            if(req.files.documents){
                for(let i=0; i<req.files.documents.length; i++){
                    let file = req.files.documents[i]
                    const document = {
                        dpath: process.env.BASE_URL+"/uploads/"+file.filename
                    }
                    documents.push(document)
                }
            }

            let tempAd = {
                ...req.body,
                photos,
                documents,
                createdby: req.member._id,
                createdat: new Date()
            }

            const newAd = new Product(tempAd)
            await newAd.save()

            res.status(201).send(newAd)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }
 
    }catch(error){
        res.send({message: error.message})
    }
}