import express from "express";
import * as categoryController from "../controllers/category";
const router = express.Router();

router.get("/all", categoryController.getCategories);
router.get("/:categoryCode", categoryController.getCategoryByCode);

export default router;
