const { Router } = require("express");
const { getBids } = require("../controllers/bidsController");
const { getListing, getAuctions } = require("../controllers/getMyController");
const { createAd } = require("../controllers/product/createAdController");
const { deleteAd, deleteAuction } = require("../controllers/product/deleteProductController");
const { editAd } = require("../controllers/product/editProductsController");
const { getMyAuction } = require("../controllers/product/getSingleProductConttroller");
const { sell } = require("../controllers/sellController");
const { auth } = require("../middleware/auth");
const upload = require("../utils/multer");
const sellerRouter = Router()

sellerRouter.post("/createad", auth, upload.fields([{name: 'photos'}, {name: 'documents'}]), createAd)
sellerRouter.post("/editad/:id", auth, upload.fields([{name: 'photos'}, {name: 'documents'}]), editAd)
sellerRouter.get("/getmylisting", auth, getListing)
sellerRouter.get("/getmyauctions", auth, getAuctions)
sellerRouter.get("/getbidslist/:id", auth, getBids)
sellerRouter.get("/getmyauction/:id", auth, getMyAuction)
sellerRouter.delete("/deletead/:id", auth, deleteAd)
sellerRouter.delete("/deleteauction/:id", auth, deleteAuction)
sellerRouter.get("/sell/:id", auth, sell)

module.exports = sellerRouter;