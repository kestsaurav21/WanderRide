const jwt = require('jsonwebtoken');
require('dotenv').config;

const generateToken = (id, role, email) => {

    return jwt.sign({id, role, email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    } )

}

module.exports = generateToken;