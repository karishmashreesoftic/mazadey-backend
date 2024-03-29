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
const { changePassword, forgotPassword } = require("../controllers/passwordController");
const { getCartDetail } = require("../controllers/cart/getCartController");
const { getAuctionsFilter } = require("../controllers/product/getAuctionsFilterController");
const { getMyBidFilter } = require("../controllers/bidFilterController");
const { getWishlistFilter } = require("../controllers/wishlist/getWishlistFilterController");
const { getProductsFilter } = require("../controllers/product/getProductsFilterController");
const { getProfile } = require("../controllers/getProfileController");

const { editProfile } = require("../controllers/editProfileController");
const { contactus } = require("../controllers/contactusController");

const commonRouter = Router()



commonRouter.get("/", (req, res) => { res.send('Mzadey Backend') })

commonRouter.post("/sendotp", sendOTP)
commonRouter.post("/signup", upload.single("qid"), signup)
commonRouter.post("/login", login)
commonRouter.get("/getprofile",auth, getProfile)
commonRouter.post("/editprofile",auth, editProfile)
commonRouter.post("/contactus",auth, contactus)

 

commonRouter.get("/categorylist", auth, getCategorylist)
commonRouter.get("/setrole", auth, checkRole)
commonRouter.post("/createad", upload.array('photos'), createAd)

commonRouter.post("/getallauctions",auth, getAuctions)
commonRouter.post("/getallauctions/:id",auth, getAuctionsFilter)
commonRouter.post("/getallproducts", auth, getProducts)
commonRouter.post("/getallproducts/:id", auth, getProductsFilter)
commonRouter.get("/getitem/:id",auth, getSingleProduct)

commonRouter.get("/getwishlist", auth, getWishlist)
commonRouter.get("/getwishlist/:id", auth, getWishlistFilter)
commonRouter.post("/addtowishlist", auth, addToWishlist)
commonRouter.get("/removefromwishlist/:id", auth, removeFromWishlist)

commonRouter.get("/getwatchlist", auth, getWatchlist)
commonRouter.post("/addtowatchlist", auth, addToWatchlist)
commonRouter.get("/removefromwatchlist/:id", auth, removeFromWatchlist)

commonRouter.post("/placebid", auth, placeBid)
commonRouter.get("/getmybids", auth,getMyBid)
commonRouter.get("/getmybids/:id", auth, getMyBidFilter)


commonRouter.get("/getcartdetail", auth, getCartDetail) //It is live but below 2 APIs needed for testing
commonRouter.get("/addtocart", auth) //PENDING
commonRouter.get("/removefromcart", auth) //PENDING

commonRouter.post("/changelanguage", auth, setLang)
commonRouter.get("/getlanguage", auth, getLang)

commonRouter.post("/changepassword", auth, changePassword)
commonRouter.get("/forgotpassword/:email", forgotPassword)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", auth, logoutAll)



module.exports = commonRouter;