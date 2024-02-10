import express from "express";
import * as areaController from "../src/controllers/area";
const router = express.Router();

router.get("/all", areaController.getAreas);
router.get("/:areaCode", areaController.getAreaByCode);

export default router;
