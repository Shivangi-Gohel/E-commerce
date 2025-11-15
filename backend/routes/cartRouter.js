import { Router } from "express";
import { addToCart, getCartById, removeFromCart } from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/add", verifyJWT, addToCart);
router.get("/getCart", verifyJWT, getCartById);
router.delete("/remove", verifyJWT, removeFromCart);

export default router;