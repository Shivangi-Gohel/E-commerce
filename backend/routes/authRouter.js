import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser } from "../controlles/authController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.patch('/update', verifyJWT, updateUser);

export default router;