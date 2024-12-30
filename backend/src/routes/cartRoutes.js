const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Cart Routes
router.get('/cart', CartController.getCarts); // Get all cart items
router.get('/cart/user/:userId', CartController.getCartByUser); // Get cart by user ID
router.post('/cart', CartController.addToCart); // Add item to cart
router.put('/cart/:id', CartController.updateCart); // Update cart item
router.delete('/cart/:id', CartController.deleteCart); // Delete cart item

module.exports = router;
