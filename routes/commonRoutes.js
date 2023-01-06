const { Router } = require("express");
const { auth } = require('../middleware/auth');
const { logout, logoutAll } = require("../controllers/signin/logoutController");
const { signup } = require("../controllers/signin/signupController");
const { sendOTP } = require("../controllers/signin/otpController");
const { login } = require("../controllers/signin/loginController");
const upload = require("../utils/multer");
// const { changePassword } = require("../controllers/password/changePasswordController");
const { checkRole } = require("../controllers/roleController");
const { createAd } = require("../controllers/product/createAdController");
const { getAuctions } = require("../controllers/product/getAuctionsController");
const { getSingleProduct } = require("../controllers/product/getSingleProductConttroller");
const { getProducts } = require("../controllers/product/getProductsController");
const { getWishlist } = require("../controllers/wishlist/getWishlistController");
const { setLang, getLang } = require("../controllers/languageController");
const { addToWishlist, removeFromWishlist } = require("../controllers/wishlist/updateWishlistController");
const { getWatchlist } = require("../controllers/watchlist/getWatchlistController");
const { addToWatchlist, removeFromWatchlist } = require("../controllers/watchlist/updateWatchlistController");
const { getCategorylist } = require("../controllers/categoryController");
const { placeBid, getMyBid } = require("../controllers/bidController");

const commonRouter = Router()

commonRouter.get("/", (req,res)=>{
    res.send('Mzadey Backend')
})


commonRouter.post("/sendotp", sendOTP)
commonRouter.post("/signup", upload.single("qid"), signup)
commonRouter.post("/login", login)

commonRouter.post("/getallauctions", auth, getAuctions)
commonRouter.post("/getallproducts", auth, getProducts)
commonRouter.get("/getitem/:id", auth, getSingleProduct)

commonRouter.get("/getwishlist", auth, getWishlist)
commonRouter.post("/addtowishlist", auth, addToWishlist)
commonRouter.get("/removefromwishlist/:id", auth, removeFromWishlist)

commonRouter.get("/getwatchlist", auth, getWatchlist) //PENDING
commonRouter.get("/addtowatchlist", auth, addToWatchlist) //PENDING
commonRouter.get("/removefromwatchlist", auth, removeFromWatchlist) //PENDING

commonRouter.get("/categorylist", auth, getCategorylist) //PENDING

commonRouter.post("/placebid", auth, placeBid) //PENDING
commonRouter.get("/getmybids", auth, getMyBid) //PENDING

commonRouter.get("/setrole", auth, checkRole)
commonRouter.post("/createad", upload.array('photos'), createAd)

commonRouter.post("/changelanguage", auth, setLang)
commonRouter.get("/getlanguage", auth, getLang)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", auth, logoutAll)



module.exports = commonRouter;