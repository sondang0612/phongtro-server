const insertService = require("../services/insert");

const insert = async (req, res) => {
  try {
    const response = await insertService.insert();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: 1,
      msg: "Fail at insert controller: " + error,
    });
  }
};

module.exports = { insert };
