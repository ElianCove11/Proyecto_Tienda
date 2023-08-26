import { Router } from "express";
import { addProduct, deleteProduct, getCart, updateProduct } from "../controllers/cart.controller";
import { isAuthenticated } from "../auth/index.auth";

const router = Router();

router.get("/", isAuthenticated, getCart);

router.post("/", isAuthenticated, addProduct);

router.put("/", isAuthenticated, updateProduct);

router.delete("/:id", isAuthenticated, deleteProduct);

export default router;
