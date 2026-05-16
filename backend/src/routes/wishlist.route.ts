import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { add, clear, remove, getAll } from "../controllers/wishlist.controller";
const router = Router();

router.post("", authenticate, add);
router.get("", authenticate, getAll);
router.delete("/:id", authenticate, remove);
router.delete("/", authenticate, clear);

export default router;
