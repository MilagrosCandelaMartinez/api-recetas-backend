const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, optionalAuth } = require('../middleware/verifyToken');

router.get('/', optionalAuth, productController.getAllProducts);
router.get('/:id', optionalAuth, productController.getProductById);
router.post('/', verifyToken, productController.createProduct);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;