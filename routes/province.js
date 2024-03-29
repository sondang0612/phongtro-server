const express = require("express");
const provinceController = require("../src/controllers/province");
const router = express.Router();

router.get("/all", provinceController.getProvinces);
router.get("/:provinceCode", provinceController.getProvinceByCode);

module.exports = router;
