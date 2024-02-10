const db = require("../models");

const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
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

const getProvinceByCodeService = (provinceCode) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findOne({
        raw: true,
        where: { code: provinceCode },
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

module.exports = { getProvincesService, getProvinceByCodeService };
