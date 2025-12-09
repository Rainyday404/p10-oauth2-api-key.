require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// --- 1. Import Routes ---
// Route untuk Produk (sudah ada sebelumnya)
const productRoutes = require('./routes/productRoutes');
// Route untuk Auth/Login (BARU DITAMBAHKAN)
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// --- 2. Integrasi Routes ---
// Endpoint Produk: http://localhost:3000/api/v1/products
app.use('/api/v1/products', productRoutes);

// Endpoint Auth: http://localhost:3000/api/v1/auth (BARU DITAMBAHKAN)
app.use('/api/v1/auth', authRoutes);

// Route sederhana untuk cek server nyala
app.get('/', (req, res) => {
    res.json({ 
        message: 'Server API Praktikum 10 Berjalan!', 
        author: 'Rain (230104040205)',
        db_status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// --- 3. Koneksi Database & Start Server ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Koneksi ke MongoDB Atlas Berhasil!');
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Gagal Koneksi ke Database:', err.message);
    });