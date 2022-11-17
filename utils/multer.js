const multer = require("multer")
const fs = require('fs-extra');
const crypto = require("crypto");

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       fs.mkdirsSync("uploads/")
       cb(null, 'uploads/');    
    }, 
    filename: function (req, file, cb) { 
       const id = crypto.randomBytes(16).toString("hex");
       cb(null , id+file.originalname);   
    }
 });

const upload = multer({storage});

module.exports = upload