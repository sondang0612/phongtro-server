const db = require("../models");

const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value", "label"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get categories",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

const getCategoryByCodeService = (categoryCode) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOne({
        where: { code: categoryCode },
        raw: true,
        attributes: ["code", "value", "label"],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get categories",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getCategoriesService, getCategoryByCodeService };
