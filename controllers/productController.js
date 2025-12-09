const Product = require('../models/Product');

// --- 1. PUBLIK (API Key Protected) ---
const getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        // Ambil nama pemilik key dari middleware
        const keyOwner = req.apiKey ? req.apiKey.owner : 'Unknown';
        
        res.status(200).json({ 
            message: `Sukses. Diakses oleh: ${keyOwner}`, 
            data: products 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- 2. PRIVAT (JWT + Admin Role Protected) ---

// Fungsi Create
const createProduct = async (req, res) => {
    // Cek Role Admin (dari middleware validateToken)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin yang boleh membuat data.' });
    }
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ message: 'Produk dibuat', data: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fungsi Update
const updateProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin yang boleh update data.' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        res.json({ message: 'Produk diperbarui', data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fungsi Delete
const deleteProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin yang boleh menghapus data.' });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        res.json({ message: 'Produk dihapus.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export SEMUA fungsi agar bisa dibaca oleh routes
module.exports = { getPublicProducts, createProduct, updateProduct, deleteProduct };