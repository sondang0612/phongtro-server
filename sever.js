const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/connectDB");
const initRoutes = require("./routes");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connectDB();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}....`);
});

module.exports = app;
