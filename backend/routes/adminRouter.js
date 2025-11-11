import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controlles/adminController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/add', verifyAdmin, addProduct);
router.patch('/update', verifyAdmin,  updateProduct);
router.post('/delete', verifyAdmin, deleteProduct);
router.get('/all', verifyAdmin, getAllProducts);
router.get('/:productId', verifyAdmin, getProductById);

export default router;