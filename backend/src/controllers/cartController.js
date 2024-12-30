const Cart = require('../models/cartModel');

class CartController {
    static async getCarts(req, res) {
        try {
            const carts = await Cart.findAll();
            res.json({ status: 'success', data: carts });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async getCartByUser(req, res) {
        try {
            const carts = await Cart.findByUserId(req.params.userId);
            res.json({ status: 'success', data: carts });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const { user_id, product_id, quantity } = req.body;
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({ status: 'error', message: 'Please provide user_id, product_id, and quantity' });
            }
            const cartId = await Cart.create({ user_id, product_id, quantity });
            res.status(201).json({ status: 'success', message: 'Item added to cart', data: { id: cartId } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async updateCart(req, res) {
        try {
            const { quantity } = req.body;
            const updated = await Cart.update(req.params.id, { quantity });
            if (!updated) return res.status(404).json({ status: 'error', message: 'Cart item not found' });
            res.json({ status: 'success', message: 'Cart updated successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async deleteCart(req, res) {
        try {
            const deleted = await Cart.delete(req.params.id);
            if (!deleted) return res.status(404).json({ status: 'error', message: 'Cart item not found' });
            res.json({ status: 'success', message: 'Cart item deleted successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = CartController;
