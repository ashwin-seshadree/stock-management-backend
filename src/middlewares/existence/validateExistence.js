const { UserService } = require('../../services/user-service');
const { WeightService } = require('../../services/weight-service');
const { ProductService } = require('../../services/product-service');
const userService = new UserService();
const weightService = new WeightService();
const productService = new ProductService();

const userValidator = {
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

const weightValidator = {
    checkWeightExists: async (req, res, next) => {
        const { weight } = req.body;

        try {
            const weightdata = await weightService.findWeightByName(weight);
            if (weightdata) {
                return res.status(400).json({ message: 'Weight already exists' });
            }
            next();
        } catch (err) {
            console.error('Error in validateExistence middleware:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const productValidator = {
    checkProductExists: async (req, res, next) => {
        const { product_name } = req.body;

        try {
            const productData = await productService.findProductByName(product_name);
            if (productData) {
                return res.status(400).json({ message: 'Product already exists' });
            }
            next();
        } catch (err) {
            console.error('Error in validateExistence middleware:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { userValidator, weightValidator, productValidator };