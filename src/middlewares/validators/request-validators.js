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
            description: joi.string().allow('', null).optional().max(500),
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

const InventoryRequestValidator = {
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

const PurchaseRequestValidator = {
    validateAddPurchase: async (req, res, next) => {

        const purchaseProductSchema = joi.object({
            product_id: joi.number().integer().required(),
            weight_id: joi.number().integer().required(),
            quantity: joi.number().integer().min(1).required(),
            purchase_price: joi.string()
                .pattern(/^\d{1,8}(\.\d{1,2})?$/)
                .required().messages({
                    'string.base': 'purchase price must be a string',
                    'string.pattern.base': 'purchase price is not in valid format. eg: "12345678.90" (max 8 digits before decimal and 2 after decimal)',
                    'string.empty': 'purchase price is required',
                    'any.required': 'purchase price is required'
                }),
            selling_price: joi.string()
                .pattern(/^\d{1,8}(\.\d{1,2})?$/)
                .required().messages({
                    'string.base': 'selling price must be a string',
                    'string.pattern.base': 'selling price is not in valid format. eg: "12345678.90" (max 8 digits before decimal and 2 after decimal)',
                    'string.empty': 'selling price is required',
                    'any.required': 'selling price is required'
                })
        });

        const addPurchaseSchema = joi.object({
            purchase_items: joi.array().items(purchaseProductSchema).min(1).required(),
            purchase_date: joi.date().required(),
            purchase_bill_number: joi.string().max(50).optional(),
        });

        const { error } = addPurchaseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    },

    cancelPurchase: async (req, res, next) => {
        const cancelPurchaseSchema = joi.object({
            purchase_bill_number: joi.string().max(50).required(),
        });

        const { error } = cancelPurchaseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    }
}

module.exports = { UserRequestValidator, AuthRequestValidator, ProductRequestValidator, WeightRequestValidator, InventoryRequestValidator, PurchaseRequestValidator };