const express = require("express");
const insertController = require("../src/controllers/insert");
const router = express.Router();

router.post("/", insertController.insert);

module.exports = router;
