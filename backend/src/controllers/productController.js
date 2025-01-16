const Product = require('../models/productModel');

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.json({
                status: 'success',
                message: 'Products retrieved successfully',
                data: products,
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            res.json({
                status: 'success',
                message: 'Product retrieved successfully',
                data: product,
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async createProduct(req, res) {
        try {
            const { name, price, stock } = req.body;
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

            if (!name || isNaN(price) || isNaN(stock)) {
                return res.status(400).json({ status: 'error', message: 'Invalid input data' });
            }

            const productId = await Product.create({ name, price, stock, image_url: imageUrl });
            res.status(201).json({
                status: 'success',
                message: 'Product created successfully',
                data: { id: productId },
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    // Di controller updateProduct.js
static async updateProduct(req, res) {
    try {
      const { name, price, stock } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
  
      if (!name || isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ status: 'error', message: 'Invalid input data' });
      }
  
      const updated = await Product.update(req.params.id, { name, price, stock, image_url: imageUrl });
      if (!updated) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
      }
  
      res.json({
        status: 'success',
        message: 'Product updated successfully',
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
    
    

    static async deleteProduct(req, res) {
        try {
            const deleted = await Product.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            res.json({
                status: 'success',
                message: 'Product deleted successfully',
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = ProductController;
