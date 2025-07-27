const argon = require('argon2');

module.exports = {
    hashPassword: (p) => {
        return argon.hash(p);
    },

    verifyPassword: (hash, password) => {
        return argon.verify(hash, password)

    }
}