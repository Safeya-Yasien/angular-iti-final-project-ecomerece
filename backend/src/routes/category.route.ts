import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  add,
  deleteAll,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/category.controller";
const router = Router();

router.post("", authenticate, add);
router.get("", getAll);
router.get("/:id", getById);
router.patch("/:id", authenticate, updateById);
router.delete("/:id", authenticate, deleteById);
router.delete("/", authenticate, deleteAll);

export default router;
