const priceService = require("../services/price");

const getPrices = async (req, res) => {
  try {
    const response = await priceService.getPricesService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at price controller: " + error,
    });
  }
};

const getPriceByCode = async (req, res) => {
  const { priceCode } = req.params;
  try {
    const response = await priceService.getPriceByCodeService(priceCode);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at price controller: " + error,
    });
  }
};

module.exports = { getPrices, getPriceByCode };
