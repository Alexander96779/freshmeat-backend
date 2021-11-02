import express from 'express';
import AuthenticationController from '../controller/authenticationController';
import AuthMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', AuthMiddleware.signup, AuthenticationController.register);
router.post('/login', AuthMiddleware.login, AuthenticationController.login);

export default router;