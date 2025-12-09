const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let token;

    // 1. Cek apakah ada header Authorization dengan format "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Ambil tokennya saja (buang kata 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 3. Verifikasi token dengan kunci rahasia
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Simpan data user (id & role) ke dalam request
            // Ini PENTING agar Controller nanti tahu siapa yang sedang akses (Admin/User)
            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next(); // Lanjut ke Controller
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Akses Ditolak: Token tidak valid atau kadaluwarsa.' });
        }
    } else {
        return res.status(403).json({ message: 'Akses Ditolak: Tidak ada Token Bearer yang ditemukan.' });
    }
};

module.exports = validateToken;