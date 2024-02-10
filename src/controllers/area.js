import * as areaService from "../services/area";

export const getAreas = async (req, res) => {
  try {
    const response = await areaService.getAreasService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at area controller: " + error,
    });
  }
};

export const getAreaByCode = async (req, res) => {
  const { areaCode } = req.params;
  try {
    const response = await areaService.getAreaByCodeService(areaCode);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at area controller: " + error,
    });
  }
};
