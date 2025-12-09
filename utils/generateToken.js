const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    // Membuat token yang berisi ID user dan Role-nya
    // Token ini akan kadaluwarsa dalam 7 hari
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = generateToken;