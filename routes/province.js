import express from "express";
import * as provinceController from "../src/controllers/province";
const router = express.Router();

router.get("/all", provinceController.getProvinces);
router.get("/:provinceCode", provinceController.getProvinceByCode);

export default router;
