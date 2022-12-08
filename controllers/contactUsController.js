const ContactUs = require("../models/ContactUs")

exports.contactUs = async(req,res) =>{
    try{

        const message = await ContactUs.create({
            email : req.body.email,
            message: req.body.message,
            sendby: req.member._id
        })

        res.status(200).send({message})

    }catch(error){
        res.send({message: error.message})
    }   
}