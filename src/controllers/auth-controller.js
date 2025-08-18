const { UserService } = require('../services/user-service');
const userService = new UserService();
const utils = require('../utils/util');

module.exports = {
    async loginUser(req, res) {
        try {
            const { email_id, password } = req.body;
            const user = await userService.findUserByEmail(email_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await utils.verifyPassword(user.password, password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = utils.generateAuthToken({
                user_id: user.id,
                full_name: `${user.first_name} ${user.last_name}`,
                email_id: user.email_id,
                first_name: user.first_name,
                last_name: user.last_name,
                role_id: user.role_id
            });
            res.status(200).json({ message: 'Login successful', user, data: { token } });
        } catch (error) {
            console.error('Error in AuthController.loginUser:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}