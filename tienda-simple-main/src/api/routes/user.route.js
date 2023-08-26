import { Router } from "express";
import { login, createUser } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/register", createUser);

export default router;
