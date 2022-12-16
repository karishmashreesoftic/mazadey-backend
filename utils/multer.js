const multer = require("multer")
const fs = require('fs-extra');
const crypto = require("crypto");

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
      console.log("multer....",file)
       fs.mkdirsSync("uploads/")
       console.log("after mkdir...")
       cb(null, 'uploads/');    
    }, 
    filename: function (req, file, cb) { 
       const id = crypto.randomBytes(16).toString("hex");
       console.log("filename")
       cb(null , id+file.originalname);   
    }
 });

const upload = multer({storage});

module.exports = upload