const express = require("express");
const insertController = require("../controllers/insert");
const router = express.Router();

router.post("/", insertController.insert);

module.exports = router;
