const multer = require("multer")
const fs = require('fs-extra');
// const {GridFsStorage} = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: process.env.DB_URI,
//     file: (req, file) => {
//       console.log("multer...file...",file)
//       return new Promise((resolve, reject) => {
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: "uploads"
//           };
//           resolve(fileInfo);
//       });
//     }
// });

// const storage = new GridFsStorage({ url : process.env.DB_URI})
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         fs.mkdirsSync("/uploads")
//         cb(null, '/uploads') 
//     }
// })
// const storage = multer.diskStorage({})
// const upload = multer({dest:'uploads/'});
var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       fs.mkdirsSync("uploads/")
       cb(null, 'uploads/');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , req.member._id.toString()+file.originalname);   
    }
 });

const upload = multer({storage});

module.exports = upload