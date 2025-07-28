const { UserService } = require('../../services/user-service');
const userService = new UserService();

module.exports = {
    checkUserExists: async (req, res, next) => {
        const { email_id } = req.body;

        try {
            const user = await userService.findUserByEmail(email_id);
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
            next();
        } catch (err) {
            console.error('Error in validateExistence middleware:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}