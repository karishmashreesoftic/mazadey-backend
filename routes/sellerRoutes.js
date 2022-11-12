const { Router } = require("express");
const { getBids } = require("../controllers/bidsController");
const { getListing, getAuctions } = require("../controllers/getMyController");
const { createAd } = require("../controllers/product/createAdController");
const { deleteAd, deleteAuction } = require("../controllers/product/deleteProductController");
const { getMyAuction } = require("../controllers/product/getSingleProductConttroller");
const { auth } = require("../middleware/auth");
const upload = require("../utils/multer");
const sellerRouter = Router()

sellerRouter.post("/createad", auth, upload.fields([{name: 'photos'}, {name: 'documents'}]), createAd)
sellerRouter.get("/getmylisting", auth, getListing)
sellerRouter.get("/getmyauctions", auth, getAuctions)
sellerRouter.get("/getbidslist/:id", auth, getBids)
sellerRouter.get("/getmyauction/:id", auth, getMyAuction)
sellerRouter.delete("/deletead/:id", auth, deleteAd)
sellerRouter.delete("/deleteauction/:id", auth, deleteAuction)

module.exports = sellerRouter;