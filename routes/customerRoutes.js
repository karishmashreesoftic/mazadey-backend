const { Router } = require("express");
const { placeBid } = require("../controllers/bidsController");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const { auth } = require("../middleware/auth");
//const upload = require("../utils/multer");
const customerRouter = Router()


customerRouter.get("/addtowishlist/:id", auth, addToWishlist)
customerRouter.get("/removefromwishlist/:id", auth, removeFromWishlist)
customerRouter.get("/getwishlist", auth, getWishlist)

customerRouter.post("/placebid", auth, placeBid)


module.exports = customerRouter;