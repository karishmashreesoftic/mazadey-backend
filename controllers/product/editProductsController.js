const { unlinkSync } = require("fs-extra");
const Product = require("../../models/Product")
const validator = require("validator")
const dirpath = require("path")
const validatePhoneNumber = require('validate-phone-number-node-js');
const Photos = require("../../models/Photos");
const Documents = require("../../models/Documents");

exports.editAd = async(req, res) => {
    try{

        const oldAd = await Product.findByPk(
            req.params.id,
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

            if(req.files.photos){

                for(let i=0; i<req.files.photos.length; i++){
                    let file = req.files.photos[i]
                    await Photos.create({
                        ppath : process.env.BASE_URL+"/uploads/"+file.filename, 
                        product: oldAd._id
                    })
                }

                for(let j in oldAd.photos){
                    let p = oldAd.photos[j]
                    await Photos.destroy({where: {ppath: p.ppath}})
                    let path = p.ppath.replace(process.env.BASE_URL,"")
                    unlinkSync(dirpath.join(__dirname, '../..'+path))
                }
            }
            if(req.files.documents){

                for(let i=0; i<req.files.documents.length; i++){
                    let file = req.files.documents[i]
                    await Documents.create({
                        dpath : process.env.BASE_URL+"/uploads/"+file.filename, 
                        product: oldAd._id
                    })
                }

                for(let j in oldAd.documents){
                    let d = oldAd.documents[j]
                    await Documents.destroy({where: {dpath: d.dpath}})
                    let path = d.dpath.replace(process.env.BASE_URL,"")
                    unlinkSync(dirpath.join(__dirname, '../..'+path))
                }
            }

            const row = await Product.update(
                req.body, 
                {
                    where: {_id : oldAd._id },
                }
            )

            if(row[0]===1){
                const newAd = await Product.findByPk(
                    req.params.id,
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

                res.status(201).send(newAd)
            }else{
                throw new Error("No item found")
            }

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }
 
    }catch(error){
        res.send({message: error.message})
    }
}