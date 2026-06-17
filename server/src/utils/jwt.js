const jwt = require('jsonwebtoken');
const env = require('../config/env.config')


const generateToken = (payload) => {
    return jwt.sign(payload, env.TOKEN_KEY, { expiresIn: env.TOKEN_EXPIRY});
};


const verifyToken = (token) => {
    return jwt.verify(token, env.TOKEN_KEY);
};

module.exports = {
    generateToken,
    verifyToken
};
