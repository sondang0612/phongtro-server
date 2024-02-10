const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.json({ hello: 123 });
});

module.exports = router;
