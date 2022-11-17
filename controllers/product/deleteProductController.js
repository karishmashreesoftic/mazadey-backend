const { ObjectId } = require("mongodb")
const Bid = require("../../models/Bid")
const Product = require("../../models/Product")

exports.deleteAd = async(req,res) =>{
    try{

        if(req.member.membertype==="seller"){

            const ad = await Product.findById(req.params.id)
            if(!ad){
                throw new Error("No Ad Found")
            }
            // if(ad.photos){
            //     let ps = ad.photos
            //     for(let i=0; i<ps.length; i++){
            //         gfs.delete(ObjectId(ps[i].pid))
            //     }
            // }
            // if(ad.documents){
            //     let docs = ad.documents
            //     for(let i=0; i<docs.length; i++){
            //         gfs.delete(ObjectId(docs[i].did))
            //     }
            // }
    
            await Product.findByIdAndDelete(req.params.id)

            res.sendStatus(200)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }

    }catch(error){
        res.send({error: error.message})
    }   
}

exports.deleteAuction = async(req,res) =>{
    try{
        
        if(req.member.membertype==="seller"){

            const auc = await Product.findById(req.params.id)
            if(!auc){
                throw new Error("No Auction Found")
            }
            // if(auc.photos){
            //     let ps = auc.photos
            //     for(let i=0; i<ps.length; i++){
            //         gfs.delete(ObjectId(ps[i].pid))
            //     }
            // }
            // if(auc.documents){
            //     let docs = auc.documents
            //     for(let i=0; i<docs.length; i++){
            //         gfs.delete(ObjectId(docs[i].did))
            //     }
            // }
            for(let i=0; i<auc.bids.length; i++){
                await Bid.findByIdAndDelete(auc.bids[i])
            }

            await Product.findByIdAndDelete(req.params.id)
            res.sendStatus(200)

        }else{
            throw new Error("Only sellers are allowed to perform this action")
        }

    }catch(error){
        res.send({error: error.message})
    }   
}