const joi = require('joi');

const UserRequestValidator = {
    validateCreateUser: async (req, res, next) => {

        const addUserSchema = joi.object({
            first_name: joi.string().min(1).max(50).required(),
            last_name: joi.string().min(1).max(50).required(),
            email_id: joi.string().email().required(),
            password: joi.string().min(8).max(50).required(),
            phone_number: joi.string().pattern(/^[0-9]{10}$/).optional(),
            role_id: joi.number().valid(1, 2).required(),
        })

        const { error } = addUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

const AuthRequestValidator = {
    validateLoginUser: async (req, res, next) => {

        const loginUserSchema = joi.object({
            email_id: joi.string().email().required(),
            password: joi.string().min(8).max(50).required(),
        })

        const { error } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

const ProductRequestValidator = {
    validateCreateProduct: async (req, res, next) => {

        const addProductSchema = joi.object({
            product_name: joi.string().min(1).max(100).required(),
            description: joi.string().max(500).optional(),
        });

        const { error } = addProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

const WeightRequestValidator = {
    validateAddWeight: async (req, res, next) => {

        const addWeightSchema = joi.object({
            weight: joi.string().min(1).max(100).required(),
            description: joi.string().max(500).optional(),
        });

        const { error } = addWeightSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

const InventoryValidator = {
    validateAddInventoryItem: async (req, res, next) => {

        const addInventoryItemSchema = joi.object({
            product_id: joi.number().integer().required(),
            weight_id: joi.number().integer().required(),
            quantity: joi.number().integer().min(1).required(),
            price: joi.string()
                .pattern(/^\d{1,8}\.\d{2}$/)
                .required().messages({
                    'string.base': 'price must be a string',
                    'string.pattern.base': 'price is not in valid format. eg: "12345678.90" (max 8 digits before decimal and 2 after decimal)',
                    'string.empty': 'price is required',
                    'any.required': 'price is required'
                })
        });

        const { error } = addInventoryItemSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }

        req.body.price = parseFloat(req.body.price);
        next();
    }
}

module.exports = { UserRequestValidator, AuthRequestValidator, ProductRequestValidator, WeightRequestValidator, InventoryValidator };