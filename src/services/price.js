const db = require("../models");

const getPricesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get prices",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

const getPriceByCodeService = (priceCode) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findOne({
        where: { code: priceCode },
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get prices",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getPricesService, getPriceByCodeService };
