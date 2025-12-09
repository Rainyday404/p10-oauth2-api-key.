require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Koneksi Database Berhasil');
        
        // Hapus Data Lama
        await Product.deleteMany();
        await User.deleteMany();
        await ApiKey.deleteMany();
        console.log('🧹 Data Lama Dihapus');

        // Masukkan Data Produk
        await Product.create([
            { name: 'Laptop Gaming Rain', price: 15000000, stock: 10, description: 'High Spec' },
            { name: 'Mouse RGB', price: 250000, stock: 50, description: 'Glowing' }
        ]);

        // Masukkan Data User
        // Password akan otomatis di-hash oleh model User.js
        await User.create([
            { username: 'admin', password: 'password123', role: 'admin' },
            { username: 'userbiasa', password: 'userpass', role: 'user' }
        ]);

        // Masukkan Data API Key
        await ApiKey.create([
            { key: 'API_KEY_RAIN_SECRET_123', owner: 'Rain App Client' }
        ]);

        console.log('✅ Data Seeding Berhasil! (User, Produk, API Key Siap)');
        process.exit();
    } catch (err) {
        console.error('❌ Gagal Seeding:', err);
        process.exit(1);
    }
};

seedDB();