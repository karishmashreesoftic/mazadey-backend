const { ObjectId } = require("mongodb")
const { FactorInstance } = require("twilio/lib/rest/verify/v2/service/entity/factor")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// exports.test = async(req,res) =>{
//     try{
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: 'payment',
//             success_url: ,
//             cancel_url: 
//         })
//         //gfs.delete(ObjectId(req.params.id))
//         // database.uploads.chunks.remove({files_id: req.params.id});
//         // database.uploads.files.remove({_id: req.params.id});
//     }catch(error){
//         res.send({error: error.message})
//     }   
// }

exports.getTest = async(req, res) => {
    try{
        console.log("req.params.filename...",req.params.filename)
        const file = gfs
            .find({
                _id: ObjectId("636369c2680bbcf9650755fe")
            })
            .toArray((err, files) => {
                console.log("FILES...",files)
                if (!files || files.length === 0) {
                    return res.status(404).json({
                    err: "no files exist"
                    });
                }
            gfs.openDownloadStreamByName(files[0].filename).pipe(res);
        });
 
    }catch(error){
        res.send({error: error.message})
    }
}