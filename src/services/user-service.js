const userModal = require('../models/master-user');

class UserService {
    async createUser(userData) {
        return await userModal.create(userData);
    }

    async findUserByEmailAndStatus(email, active_status = true) {
        return await userModal.findOne({ where: { email_id: email, is_active: active_status } });
    }

    async findUserByEmail(email) {
        return await userModal.findOne({ where: { email_id: email } });
    }
}

module.exports = { UserService };