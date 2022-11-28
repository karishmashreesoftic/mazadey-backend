const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});

const bidSchema = new mongoose.Schema({

    amount:{ 
        type: Number, 
        default: 0 
    },
    placedby:{
        type: mongoose.Schema.Types.ObjectId, ref:'Member'
    },
    auction:{
        type: mongoose.Schema.Types.ObjectId, ref:'Product' 
    },
    winner:{
        type: Boolean
    },
    createdat:{ type: Date },
})

const Bid = mongoose.model('Bid',bidSchema)

module.exports = Bid
