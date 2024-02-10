const express = require("express");
const testRouter = require("./routes/test");
const app = express();

app.use("/api/v1/test", testRouter);
app.get("/", (req, res) => {
  res.json({ msg: "on" });
});

app.listen(5000, () => {
  console.log("on");
});

module.exports = app;
