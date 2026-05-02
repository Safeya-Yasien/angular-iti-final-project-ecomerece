import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  add,
  deleteAll,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/product.controller";
import { uploadProductImages } from "../middlewares/multer.middleware";
const router = Router();

router.post("", authenticate, uploadProductImages, add);
router.get("", getAll);
router.get("/:id", getById);
router.put("/:id", authenticate, uploadProductImages, updateById);
router.delete("/", authenticate, deleteAll);
router.delete("/:id", authenticate, deleteById);

export default router;
