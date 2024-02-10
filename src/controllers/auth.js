const authService = require("../services/auth");

const register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    if (!name || !phone || !password) {
      res.status(400).json({
        err: 1,
        msg: "Missing input!",
      });
    }
    const response = await authService.registerService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: 1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password) {
      res.status(400).json({
        err: 1,
        msg: "Missing input!",
      });
    }
    const response = await authService.loginService(req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

module.exports = { register, login };
