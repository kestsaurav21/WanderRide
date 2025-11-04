const jwt = require('jsonwebtoken');
require('dotenv').config;

const generateToken = (id, role, email) => {
    const secret = process.env.JWT_SECRET || "test_secret";
    return jwt.sign({id, role, email}, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    } )

}

module.exports = generateToken;