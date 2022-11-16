const { Router } = require("express");
const { auth } = require('../middleware/auth');
const { logout, logoutAll } = require("../controllers/signin/logoutController");
const { signup } = require("../controllers/signin/signupController");
const { verifyOTP, sendOTP } = require("../controllers/signin/otpController");
const { login } = require("../controllers/signin/loginController");
const { sendToEmail, verifyEmailCode } = require("../controllers/password/emailCodeController");
const { test, getTest } = require("./testController");
const upload = require("../utils/multer");
// const multer = require("multer")
const {GridFsStorage} = require('multer-gridfs-storage');
const { uploadQid } = require("../controllers/qidController");
const { getFile } = require("../controllers/fileController");
const { getSingleAd, getSingleAuction } = require("../controllers/product/getSingleProductConttroller");
const { getMaxBid } = require("../controllers/bidsController");
const { getProfile, editProfile } = require("../controllers/memberProfileController");
const { changePassword } = require("../controllers/password/changePasswordController");
const { getProducts } = require("../controllers/product/getProductsController");
const { createPassword } = require("../controllers/password/createNewPasswordController");
// const storage = new GridFsStorage({ url : process.env.DB_URI})
// const upload = multer({storage});

const commonRouter = Router()


commonRouter.get("/", (req,res)=>{
    res.send('Mzadey Backend')
})

commonRouter.post("/sendotp", sendOTP)
commonRouter.post("/signup", signup)

commonRouter.post("/login", login)

commonRouter.post("/sendemailcode", sendToEmail)
commonRouter.post("/verifyemailcode", verifyEmailCode)

commonRouter.post("/uploadqid", auth, upload.single("qid"), uploadQid)

commonRouter.get("/getad/:id", auth, getSingleAd)
commonRouter.get("/getauction/:id", auth, getSingleAuction)
commonRouter.get("/getmaxbid/:id", auth, getMaxBid)

commonRouter.get("/getitems/filter?", auth, getProducts)

commonRouter.post("/addbalance", auth)
commonRouter.post("/withdrawbalance", auth)

commonRouter.get("/file/:id", auth, getFile)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", logoutAll)

// commonRouter.post("/uploadtest", upload.single("file"), test)
// commonRouter.delete("/deletefile/:id", test)
commonRouter.get("/getfile/:id", getTest)

commonRouter.get("/getprofile", auth, getProfile)
commonRouter.post("/editprofile", auth, editProfile)

commonRouter.post("/changepassword", auth, changePassword)
commonRouter.post("/createnewpassword", createPassword)

module.exports = commonRouter;