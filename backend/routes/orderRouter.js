import { Router } from 'express';
import { cancelOrder, createOrder, getAllOrders, getMyOrders, updateOrderStatus } from '../controllers/orderController.js';
import { verifyAdmin, verifyJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', verifyJWT,  createOrder);
router.get('/myOrders', verifyJWT,  getMyOrders);
router.get('/allOrders', verifyAdmin,  getAllOrders);
router.put('/updateStatus', verifyAdmin,  updateOrderStatus);
router.patch('/cancel', verifyJWT,  cancelOrder);


export default router;