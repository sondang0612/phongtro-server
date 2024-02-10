import express from "express";
import * as priceController from "../src/controllers/price";
const router = express.Router();

router.get("/all", priceController.getPrices);
router.get("/:priceCode", priceController.getPriceByCode);

export default router;