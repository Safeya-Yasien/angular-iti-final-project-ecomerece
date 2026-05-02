import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { deleteById, getAll } from "../controllers/user.controller";
const router = Router();

router.get("", getAll);
router.delete("/:id", authenticate, deleteById);

export default router;
