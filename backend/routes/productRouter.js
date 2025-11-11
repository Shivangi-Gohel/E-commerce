import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
import { verifyAdmin, verifyJWT } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post('/add', verifyAdmin, upload.array("images", 5), addProduct);
router.patch('/update', verifyAdmin,  updateProduct);
router.delete('/delete', verifyAdmin, deleteProduct);
router.get('/all', verifyJWT, getAllProducts);
router.get('/:productId', verifyJWT, getProductById);

export default router;