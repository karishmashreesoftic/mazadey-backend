const Product = require("../../models/Product")


exports.createAd = async(req, res) => {
    try{

        if(req.member.membertype==="seller"){

            let photos = []
            let documents = []
            if(req.files.photos){
                for(let i=0; i<req.files.photos.length; i++){
                    let file = req.files.photos[i]
                    const url = process.env.BASE_URL+"/file/"+file.id.toString()
                    const photo = {
                        pid: file.id,
                        purl: url
                    }
                    photos.push(photo)
                }
            }
            if(req.files.documents){
                for(let i=0; i<req.files.documents.length; i++){
                    let file = req.files.documents[i]
                    const url = process.env.BASE_URL+"/file/"+file.id.toString()
                    const document = {
                        did: file.id,
                        durl: url
                    }
                    documents.push(document)
                }
            }

            let tempAd = {
                ...req.body,
                photos,
                documents,
                createdby: req.member._id
            }

            const newAd = new Product(tempAd)
            await newAd.save()

            res.status(201).send(newAd)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }
 
    }catch(error){
        res.send({error: error.message})
    }
}