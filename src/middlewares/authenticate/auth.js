const utils = require('../../utils/util');

module.exports = {
    authenticate: async (req, res, next) => {
        if (req.url.includes("/auth") && !req.url.includes("/logout")) {
            return next();
        }
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        }
        const token = authorization.split(' ')[1];
        try {
            const decoded = utils.verifyAuthToken(token);
            req['user'] = decoded['user'];
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
        }
    }
}