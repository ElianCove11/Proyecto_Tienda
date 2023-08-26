import { Router } from "express";
import { isAuthenticated } from "../auth/index.auth";
import { create, findAll } from "../controllers/sale.controller";

const router = Router();

router.get("/", isAuthenticated, findAll);

router.post("/", isAuthenticated, create);

export default router;
