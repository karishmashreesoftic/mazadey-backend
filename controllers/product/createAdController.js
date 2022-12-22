const Product = require("../../models/Product")
const validatePhoneNumber = require('validate-phone-number-node-js');
const crypto = require("crypto");
const validator = require("validator");
const Photos = require("../../models/Photos");
const Documents = require("../../models/Documents");

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

            const newAd = await Product.create(
                {
                    ...req.body,
                    statusat: new Date(),
                    createdby: req.member._id
                }
            )

            if(req.files.photos){
                for(let i=0; i<req.files.photos.length; i++){
                    let file = req.files.photos[i]
                    await Photos.create({
                        ppath : process.env.BASE_URL+"/uploads/"+file.filename, 
                        product: newAd._id
                    })
                }
            }
            if(req.files.documents){
                for(let i=0; i<req.files.documents.length; i++){
                    let file = req.files.documents[i]
                    await Documents.create({
                        dpath : process.env.BASE_URL+"/uploads/"+file.filename, 
                        product: newAd._id
                    })
                }
            }
            const product = await Product.findByPk(
                newAd._id,
                {
                    include: [
                        {
                            model: Photos,
                            as: "photos",
                            attributes: ['ppath']
                        },
                        {
                            model: Documents,
                            as: "documents",
                            attributes: ['dpath']
                        }
                    ]
                }
            )

            res.status(201).send(product)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }
 
    }catch(error){
        res.send({message: error.message})
    }
}