const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Product Routes
router.get('/products', ProductController.getProducts); // Get all products
router.get('/products/:id', ProductController.getProduct); // Get product by ID
router.post('/products', ProductController.createProduct); // Create product
router.put('/products/:id', ProductController.updateProduct); // Update product
router.delete('/products/:id', ProductController.deleteProduct); // Delete product

module.exports = router;
