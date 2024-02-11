const express = require("express");
const areaController = require("../src/controllers/area");
const router = express.Router();

router.get("/all", areaController.getAreas);
router.get("/:areaCode", areaController.getAreaByCode);

module.exports = router;
