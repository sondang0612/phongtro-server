const authRouter = require("./auth");
const insertRouter = require("./insert");
const categoryRouter = require("./category");
const postRouter = require("./post");
const priceRouter = require("./price");
const areaRouter = require("./area");
const provinceRouter = require("./province");
const userRouter = require("./user");

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", userRouter);

  app.use("/", (req, res) => {
    res.status(200).json({ msg: "on" });
    console.log("server on...");
  });
};

module.exports = initRoutes;
