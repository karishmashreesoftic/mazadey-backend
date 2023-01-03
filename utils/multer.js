const multer = require("multer")
const fs = require('fs-extra');
const crypto = require("crypto");

var storage = multer.diskStorage({   
    filename: function (req, file, cb) { 
       console.log("filename")
       cb(null , file.originalname);   
    }
 });

const upload = multer({storage});

module.exports = upload