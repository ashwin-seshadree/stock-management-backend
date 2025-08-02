module.exports = {
    async validateBody(req, res, next) {
        if ((!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) && req.method !== 'GET') {
            return res.status(400).json({
                message: "Invalid request body. Expected an object."
            });
        }
        
        next();
    }
}