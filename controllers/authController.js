const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { username, password } = req.body;

    // 1. Cari pengguna berdasarkan username
    const user = await User.findOne({ username });

    // 2. Cek apakah user ada DAN passwordnya cocok
    // (matchPassword adalah fungsi yang kita buat di models/User.js)
    if (user && (await user.matchPassword(password))) {
        res.json({
            message: 'Login Berhasil!',
            token_type: 'Bearer',
            access_token: generateToken(user._id, user.role),
            user: { 
                id: user._id,
                username: user.username, 
                role: user.role 
            }
        });
    } else {
        res.status(401).json({ message: 'Otentikasi Gagal: Username atau Password salah.' });
    }
};

module.exports = { authUser };