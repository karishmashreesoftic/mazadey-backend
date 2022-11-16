const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});
const validator = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js');

const productSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{ 
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
        validate(value){
            if(!validatePhoneNumber.validate(value)){
                throw new Error("Enter a valid Mobile Number");  
            }
        }
    },
    email:{
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Enter a valid Email Address");
            }
        }
    },
    photos: [{
        ppath: {type: String}
    }],
    documents: [{
        dpath: {type: String}
    }],
    minbid:{ 
        type: Number, 
        default: 0 
    },
    type:{ 
        type: String, 
        required: true
    },
    bids:[{
        type: mongoose.Schema.Types.ObjectId, ref:'Bid'
    }],
    status:{ type: String, default: "live"},
    createdby:{
        type: mongoose.Schema.Types.ObjectId, ref:'Member' 
    },
    createdat:{ type: Date },
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product
