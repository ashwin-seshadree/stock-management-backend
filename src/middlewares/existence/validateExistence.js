const { UserService } = require('../../services/user-service');
const { WeightService } = require('../../services/weight-service');
const { ProductService } = require('../../services/product-service');
const { InventoryService } = require('../../services/inventory-service');
const { PurchaseService } = require('../../services/purchase-service');
const userService = new UserService();
const weightService = new WeightService();
const productService = new ProductService();
const inventoryService = new InventoryService();
const purchaseService = new PurchaseService();

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

const inventoryValidator = {
    checkInventoryItemExists: async (req, res, next) => {
        const { product_id, weight_id } = req.body;

        try {
            const inventoryItem = await inventoryService.findInventoryItemByParams({ product_id, weight_id });
            if (inventoryItem) {
                return res.status(400).json({ message: 'Inventory item already exists' });
            }
            next();
        } catch (err) {
            console.error('Error in validateExistence middleware:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const purchaseValidator = {
    checkPurchaseExists: async (req, res, next) => {
        const { purchase_bill_number } = req.body;

        if (!purchase_bill_number) {
            return next();
        }

        try {
            const purchaseData = await purchaseService.findPurchaseByParam({purchase_bill_number});
            if (purchaseData) {
                return res.status(400).json({ message: 'Purchase with this bill number already exists' });
            }
            next();
        } catch (err) {
            console.error('Error in validateExistence middleware:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { userValidator, weightValidator, productValidator, inventoryValidator, purchaseValidator };