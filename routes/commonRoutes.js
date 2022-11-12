const { Router } = require("express");
const { auth } = require('../middleware/auth');
const { logout, logoutAll } = require("../controllers/signin/logoutController");
const { signup } = require("../controllers/signin/signupController");
const { verifyOTP } = require("../controllers/signin/otpController");
const { login } = require("../controllers/signin/loginController");
const { sendToEmail, verifyEmailCode } = require("../controllers/password/emailCodeController");
const { test, getTest } = require("./testController");
const upload = require("../utils/multer");
const { uploadQid } = require("../controllers/qidController");
const { getFile } = require("../controllers/fileController");
const { getSingleAd, getSingleAuction } = require("../controllers/product/getSingleProductConttroller");
const { getMaxBid } = require("../controllers/bidsController");
const { getProfile, editProfile } = require("../controllers/memberProfileController");
const { changePassword } = require("../controllers/password/changePasswordController");
const commonRouter = Router()

commonRouter.get("/", (req,res)=>{
    res.send('Mzadey Backend')
})

commonRouter.post("/signup", signup)
commonRouter.post("/verifyotp/:memberType", verifyOTP)

commonRouter.post("/login", login)

commonRouter.post("/sendemailcode", sendToEmail)
commonRouter.post("/verifyemailcode", verifyEmailCode)

commonRouter.post("/uploadqid", auth, upload.single("qid"), uploadQid)

commonRouter.get("/getad/:id", auth, getSingleAd)
commonRouter.get("/getauction/:id", auth, getSingleAuction)
commonRouter.get("/getmaxbid/:id", auth, getMaxBid)

commonRouter.post("/addbalance", auth)
commonRouter.post("/withdrawbalance", auth)

commonRouter.get("/file/:id", auth, getFile)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", logoutAll)

// commonRouter.post("/uploadtest", upload.single("file"), test)
commonRouter.delete("/deletefile/:id", test)
commonRouter.get("/getfile/:id", getTest)

commonRouter.get("/getprofile", auth, getProfile)
commonRouter.post("/editprofile", auth, editProfile)

commonRouter.post("/changepassword", auth, changePassword)

module.exports = commonRouter;