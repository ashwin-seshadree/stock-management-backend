const argon = require('argon2');
const jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: (p) => {
        return argon.hash(p);
    },

    verifyPassword: (hash, password) => {
        return argon.verify(hash, password)
    },

    generateAuthToken: (data) => {
        const jwtSecret = process.env.JWT_SECRET
        const jwtExpiration = process.env.JWT_EXPIRATION

        return jwt.sign(data, jwtSecret, {
            expiresIn: jwtExpiration
        });
    },

    verifyAuthToken: (token) => {
        const jwtSecret = process.env.JWT_SECRET
        return jwt.verify(token, jwtSecret);
    }
}