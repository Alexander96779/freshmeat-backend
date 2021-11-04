import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import ProductMiddleware from '../middleware/productMiddleware';
import ProductController from '../controller/productController';

const router = express.Router();

router.post('/products', AuthMiddleware.verifyToken, ProductMiddleware.validate, ProductController.createProduct);
router.get('/products', AuthMiddleware.verifyToken, ProductController.getAll);
router.get('/products/:id', AuthMiddleware.verifyToken, ProductMiddleware.param, ProductController.getOne);
router.put('/products/:id', AuthMiddleware.verifyToken, ProductMiddleware.param, ProductMiddleware.validate, ProductController.editProduct);
router.delete('/products/:id', AuthMiddleware.verifyToken, ProductMiddleware.param, ProductController.removeProduct);

export default router;