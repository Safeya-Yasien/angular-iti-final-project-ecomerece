import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { add, clear, getAll } from "../controllers/wishlist.controller";
const router = Router();

router.post("", authenticate, add);
router.get("", authenticate, getAll);
router.delete("/", authenticate, clear);

export default router;
