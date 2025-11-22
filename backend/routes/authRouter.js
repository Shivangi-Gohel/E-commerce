import { Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser, updateUser } from "../controllers/authController.js";
import { verifyAdmin, verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.patch('/update', verifyJWT, updateUser);
router.get('/allUsers', verifyAdmin, getAllUsers);

export default router;