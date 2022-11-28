const { unlinkSync } = require("fs-extra");
const Product = require("../../models/Product")
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js');

exports.editAd = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){

            const oldAd = await Product.findById(req.params.id)

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

                for(let j in oldAd.photos){
                    let p = oldAd.photos[j]
                    let path = p.ppath.replace(process.env.BASE_URL,"")
                    unlinkSync(path)
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

                for(let j in oldAd.documents){
                    let d = oldAd.documents[j]
                    let path = d.dpath.replace(process.env.BASE_URL,"")
                    unlinkSync(path)
                }
            }

            let tempAd = {
                ...req.body,
                photos,
                documents,
            }

            const newAd = await Product.findByIdAndUpdate(req.params._id, tempAd)

            res.status(201).send(newAd)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }
 
    }catch(error){
        res.send({message: error.message})
    }
}