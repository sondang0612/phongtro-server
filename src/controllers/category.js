import * as categoryService from "../services/category";

export const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategoriesService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at category controller: " + error,
    });
  }
};

export const getCategoryByCode = async (req, res) => {
  const { categoryCode } = req.params;
  try {
    const response = await categoryService.getCategoryByCodeService(
      categoryCode
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at category controller: " + error,
    });
  }
};
