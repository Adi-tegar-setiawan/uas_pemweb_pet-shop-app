const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ProductController = require('../controllers/productController');

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Folder tujuan
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, or .png files are allowed!'));
        }
    }
});

// // Endpoint untuk menambahkan produk
// router.post('/products', upload.single('image'), async (req, res) => {
//     const { name, price, stock } = req.body;
//     const image_url = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!name || !price || !stock || !image_url) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'All fields are required, including image',
//         });
//     }

//     try {
//         const productId = await ProductController.createProduct({
//             name,
//             price,
//             stock,
//             image_url,
//         });

//         res.status(201).json({
//             status: 'success',
//             message: 'Product created successfully',
//             data: { id: productId },
//         });
//     } catch (error) {
//         res.status(500).json({ status: 'error', message: error.message });
//     }
// });



// Product Routes
router.get('/products', ProductController.getProducts); // Get all products
router.get('/products/:id', ProductController.getProduct); // Get product by ID
router.post('/products', ProductController.createProduct); // Create product
router.put('/products/:id', ProductController.updateProduct); // Update product
router.delete('/products/:id', ProductController.deleteProduct); // Delete product

module.exports = router;
