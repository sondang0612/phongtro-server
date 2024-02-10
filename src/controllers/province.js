const provinceService = require("../services/province");

const getProvinces = async (req, res) => {
  try {
    const response = await provinceService.getProvincesService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at province controller: " + error,
    });
  }
};

const getProvinceByCode = async (req, res) => {
  const { provinceCode } = req.params;
  try {
    const response = await provinceService.getProvinceByCodeService(
      provinceCode
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at province controller: " + error,
    });
  }
};

module.exports = { getProvinces, getProvinceByCode };
