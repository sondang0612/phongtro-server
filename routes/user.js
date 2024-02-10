import express from "express";
import * as userController from "../src/controllers/user";
import verifyToken from "../src/middlewares/verifyToken";
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);

export default router;
