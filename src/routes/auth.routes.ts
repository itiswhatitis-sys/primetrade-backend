import { Router } from "express";
import { register, login, refreshToken, logout, getMe } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", refreshToken);
router.post("/logout", logout);
router.get("/me", getMe);
export default router;
