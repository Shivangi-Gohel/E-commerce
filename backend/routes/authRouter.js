import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser } from "../controlles/authController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/update', updateUser);

export default router;