const multer = require("multer")
const fs = require('fs-extra');
const crypto = require("crypto");

var storage = multer.diskStorage({   
    filename: function (req, file, cb) { 
       const id = crypto.randomBytes(16).toString("hex");
       console.log("filename")
       cb(null , id+file.originalname);   
    }
 });

const upload = multer({storage});

module.exports = upload