const express = require("express");
const userController = require(".../src/controllers/user");
const verifyToken = require("../src/middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
module.exports = router;
