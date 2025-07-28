const userModal = require('../models/User');

class UserService {
    async createUser(userData) {
        return await userModal.create(userData);
    }

    async findUserByEmail(email) {
        return await userModal.findOne({ where: { email_id: email } });
    }
}

module.exports = { UserService };