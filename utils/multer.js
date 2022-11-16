const multer = require("multer")
const {GridFsStorage} = require('multer-gridfs-storage');

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
//   });

const storage = new GridFsStorage({ url : process.env.DB_URI})
const upload = multer({storage});

module.exports = upload