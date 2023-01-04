const { Router } = require("express");
const { auth } = require('../middleware/auth');
const { logout, logoutAll } = require("../controllers/signin/logoutController");
const { signup } = require("../controllers/signin/signupController");
const { sendOTP } = require("../controllers/signin/otpController");
const { login } = require("../controllers/signin/loginController");
// const { sendToEmail, verifyEmailCode } = require("../controllers/password/emailCodeController");
const upload = require("../utils/multer");
// const { uploadQid } = require("../controllers/qidController");
// const { getSingleAd, getSingleAuction } = require("../controllers/product/getSingleProductConttroller");
// const { getMaxBid } = require("../controllers/bidsController");
// const { getProfile, editProfile } = require("../controllers/memberProfileController");
// const { changePassword } = require("../controllers/password/changePasswordController");
const { getProducts, getFilteredProducts } = require("../controllers/product/getProductsController");
// const { createPassword } = require("../controllers/password/createNewPasswordController");
// const { deleteAccount } = require("../controllers/deleteAccountController");
// const { getFAQ } = require("../controllers/getFAQ");
// const { contactUs } = require("../controllers/contactUsController");
// const upload = require("../utils/multer");

const commonRouter = Router()


commonRouter.get("/", (req,res)=>{
    res.send('Mzadey Backend')
})

commonRouter.post("/sendotp", sendOTP)
commonRouter.post("/signup", upload.single("qid"), signup)
// commonRouter.post("/checkdata", async (req,res) => {
//     console.log("req.body...",req.body)
//     console.log("req.headers...",req.headers)
// })

commonRouter.post("/login", login)

// commonRouter.post("/sendemailcode", sendToEmail)
// commonRouter.post("/verifyemailcode", verifyEmailCode)

// commonRouter.post("/uploadqid", auth, upload.single("qid"), uploadQid)

// commonRouter.get("/getad/:id", auth, getSingleAd)
// commonRouter.get("/getauction/:id", auth, getSingleAuction)
// commonRouter.get("/getmaxbid/:id", auth, getMaxBid)

commonRouter.get("/getfiltereditems/filter?", auth, getFilteredProducts)
commonRouter.get("/getallitems", auth, getProducts)

// commonRouter.post("/addbalance", auth)
// commonRouter.post("/withdrawbalance", auth)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", auth, logoutAll)

// commonRouter.delete("/deleteaccount", auth, deleteAccount)

// commonRouter.get("/getprofile", auth, getProfile)
// commonRouter.post("/editprofile", auth, editProfile)

// commonRouter.post("/changepassword", auth, changePassword)
// commonRouter.post("/createnewpassword", createPassword)

// commonRouter.get("/getfaq", auth, getFAQ)

// commonRouter.post("/contactus", auth, contactUs)

module.exports = commonRouter;