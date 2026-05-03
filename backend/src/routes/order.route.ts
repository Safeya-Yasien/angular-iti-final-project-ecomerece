import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getAll, cancel } from "../controllers/order.controller";
const router = Router();

router.get("", authenticate, getAll);
router.delete("/:id", authenticate, cancel);

export default router;
