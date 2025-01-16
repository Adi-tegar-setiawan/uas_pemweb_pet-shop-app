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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
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
    },
});

// Penanganan error multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message) {
        return res.status(400).json({
            status: 'error',
            message: err.message || 'File upload error',
        });
    }
    console.log('File uploaded:', req.file);
    next();
};

// Product Routes
router.get('/products', ProductController.getProducts); // Get all products
router.get('/products/:id', ProductController.getProduct); // Get product by ID

router.post(
    '/products',
    upload.single('image'),
    handleMulterError,
    ProductController.createProduct
); // Create product with image upload

router.put('/products/:id', upload.single('image'), ProductController.updateProduct); // Update product with image upload

router.delete('/products/:id', ProductController.deleteProduct); // Delete product

module.exports = router;
