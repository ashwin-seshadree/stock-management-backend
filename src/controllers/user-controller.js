const { UserService } = require('../services/user-service');
const userService = new UserService();
const utils = require('../utils/util');

module.exports = {
    async createUser(req, res) {
        try {
            let userData = req.body;
            userData.password = await utils.hashPassword(userData.password);
            const user = await userService.createUser(userData);
            if (user) {
                res.status(201).json({ message: 'User created successfully', user });
            }
        } catch (error) {
            console.error('Error in UserController.createUser:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}