import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import OrderController from '../controller/orderController';
import OrderMiddleware from '../middleware/orderMiddleware';

const router = express.Router();

router.post('/orders', AuthMiddleware.verifyToken, OrderMiddleware.validate, OrderController.createOrder);
router.get('/orders', AuthMiddleware.verifyToken, OrderController.getAll);
router.get('/orders/:id', AuthMiddleware.verifyToken, OrderMiddleware.param, OrderController.getOne);
router.put('/orders/:id', AuthMiddleware.verifyToken, OrderMiddleware.param, OrderMiddleware.validate, OrderController.editOrder);
router.put('/orders/cancel/:id', AuthMiddleware.verifyToken, OrderMiddleware.param, OrderController.cancelOrder);
router.delete('/orders/:id', AuthMiddleware.verifyToken, OrderMiddleware.param, OrderController.removeOrder);

export default router;