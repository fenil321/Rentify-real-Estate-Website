import express from "express";
import { login, logout, register, validate } from "../controllerss/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/validate",validate)
router.post("/login", login)
router.post("/logout", logout)

export default router