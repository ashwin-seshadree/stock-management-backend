const joi = require('joi');

const UserRequestValidator = {
    validateCreateUser: async (req, res, next) => {
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
            return res.status(400).json({
                message: "Invalid request body. Expected an object."
            });
        }

        const addUserSchema = joi.object({
            first_name: joi.string().min(1).max(50).required(),
            last_name: joi.string().min(1).max(50).required(),
            email_id: joi.string().email().required(),
            password: joi.string().min(8).max(50).required(),
            phone_number: joi.string().pattern(/^[0-9]{10}$/).optional(),
            role_id: joi.number().valid(1, 2).required(),
        })

        const { error } = await addUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

module.exports = { UserRequestValidator };