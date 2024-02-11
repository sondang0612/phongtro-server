const express = require("express");
const userController = require("../controllers/user");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
module.exports = router;
