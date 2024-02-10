const express = require("express");
const categoryController = require("../src/controllers/category");
const router = express.Router();

router.get("/all", categoryController.getCategories);
router.get("/:categoryCode", categoryController.getCategoryByCode);

module.exports = router;
