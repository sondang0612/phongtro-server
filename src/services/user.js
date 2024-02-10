const db = require("../models");

const getUserService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
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

module.exports = { getUserService };
