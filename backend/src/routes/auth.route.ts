import express, { Router } from "express";
import { getMe, login, signup } from "../controllers/auth.controller";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getMe);

export default router;
