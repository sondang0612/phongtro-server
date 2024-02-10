const userService = require("../services/user");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userService.getUserService(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at user controller: " + error,
    });
  }
};

const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await userService.getUserService(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at user controller: " + error,
    });
  }
};

module.exports = { getCurrent, getUser };
