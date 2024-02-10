import express from "express";
import * as insertController from "../src/controllers/insert";
const router = express.Router();

router.post("/", insertController.insert);

export default router;
