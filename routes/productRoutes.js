const express = require('express');
const router = express.Router();
const { getPublicProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Import Middleware
const validateApiKey = require('../middleware/validateApiKey');
const validateToken = require('../middleware/validateToken');

// 1. ROUTE PUBLIK (Akses Baca Saja)
// Dijaga oleh API Key
router.get('/public', validateApiKey, getPublicProducts);

// 2. ROUTE PRIVAT (Akses Tulis/Ubah)
// Dijaga oleh Token JWT
// Endpoint: POST /api/v1/products/private
router.post('/private', validateToken, createProduct);

// Endpoint: PUT /api/v1/products/private/:id
router.put('/private/:id', validateToken, updateProduct);

// Endpoint: DELETE /api/v1/products/private/:id
router.delete('/private/:id', validateToken, deleteProduct);

module.exports = router;