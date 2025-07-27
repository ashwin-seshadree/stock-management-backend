const userModal = require('../models/User');

class UserService {
    async createUser(userData) {
        try {
            const user = await userModal.create(userData);
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

module.exports = { UserService };