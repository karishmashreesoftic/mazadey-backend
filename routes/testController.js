const { ObjectId } = require("mongodb")
const { FactorInstance } = require("twilio/lib/rest/verify/v2/service/entity/factor")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const fs = require('fs');
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
        const data = fs.readFileSync("uploads/6371c66371e5725036f77abfavatar.png",
              {encoding:'utf8', flag:'r'});
 
    res.send(data);
        
    }catch(error){
        res.send({message: error.message})
    }
}