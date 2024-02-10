const express = require("express");
const priceController = require("../controllers/price");
const router = express.Router();

router.get("/all", priceController.getPrices);
router.get("/:priceCode", priceController.getPriceByCode);

module.exports = router;
