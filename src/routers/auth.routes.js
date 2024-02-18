import express from 'express'
import { getAllUsers, loginUser, registerUser } from '../controller/auth.controllers.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/all-users/:userId', getAllUsers)
export default router