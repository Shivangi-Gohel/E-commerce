import { Router } from "express";
import { addToCart, getCartById } from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/add", verifyJWT, addToCart);
router.get("/getCart", verifyJWT, getCartById);

export default router;