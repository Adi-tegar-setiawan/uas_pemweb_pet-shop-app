const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const fs = require('fs');

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.get('/uploads-debug', (req, res) => {
    const fs = require('fs');
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to read uploads folder',
            });
        }

        res.json({
            status: 'success',
            message: 'Uploads folder content',
            data: files,
        });
    });
});


// Middleware

app.use(cors({
    origin: ['http://localhost:3001'], // Ganti dengan domain frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Register routes
app.use('/api', productRoutes); // Routes untuk produk
app.use('/api', userRoutes);    // Routes untuk users
app.use('/api', cartRoutes);    // Routes untuk cart

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
