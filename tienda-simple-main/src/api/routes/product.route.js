import { Router } from "express";
import { getAll } from "../controllers/product.controller";

const router = Router();

router.get("/",  getAll);

export default router;
