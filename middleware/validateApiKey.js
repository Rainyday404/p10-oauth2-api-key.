const ApiKey = require('../models/ApiKey');

const validateApiKey = async (req, res, next) => {
    // 1. Cek apakah ada 'x-api-key' di header
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(401).json({ message: 'Akses Ditolak: API Key tidak ditemukan.' });
    }

    try {
        // 2. Cek apakah key tersebut ada di database dan statusnya active
        const existingKey = await ApiKey.findOne({ key: apiKey, status: 'active' });
        
        if (!existingKey) {
            return res.status(401).json({ message: 'Akses Ditolak: API Key tidak valid.' });
        }

        // 3. Simpan info pemilik key agar bisa dibaca di Controller
        req.apiKey = existingKey;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error saat validasi API Key' });
    }
};

module.exports = validateApiKey;