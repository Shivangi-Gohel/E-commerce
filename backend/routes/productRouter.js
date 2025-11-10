import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controlles/productController.js";

const router = Router();

router.post('/add', addProduct);
router.post('/update', updateProduct);
router.post('/delete', deleteProduct);
router.get('/all', getAllProducts);
router.get('/:productId', getProductById);

export default router;