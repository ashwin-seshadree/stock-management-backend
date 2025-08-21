const { UserService } = require("../../services/user-service");
const { WeightService } = require("../../services/weight-service");
const { ProductService } = require("../../services/product-service");
const { InventoryService } = require("../../services/inventory-service");
const { PurchaseService } = require("../../services/purchase-service");

const userValidator = {
    checkUserExists: async (req, res, next) => {
        const { email_id } = req.body;

        try {
            const userService = new UserService();

            const user = await userService.findUserByEmail(email_id);
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            next();
        } catch (err) {
            console.error("Error in validateExistence middleware:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

const weightValidator = {
    checkWeightExists: async (req, res, next) => {
        const { weight } = req.body;

        try {
            const weightService = new WeightService();
            const weightdata = await weightService.findWeightByName(weight);

            if (weightdata) {
                return res.status(400).json({ message: "Weight already exists" });
            }

            next();
        } catch (err) {
            console.error("Error in validateExistence middleware:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

const productValidator = {
    checkProductExists: async (req, res, next) => {
        const { product_name } = req.body;

        try {
            const productService = new ProductService();
            const productData = await productService.findProductByName(product_name);

            if (productData) {
                return res.status(400).json({ message: "Product already exists" });
            }
            next();
        } catch (err) {
            console.error("Error in validateExistence middleware:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

const purchaseValidator = {
    checkPurchaseExists: async (req, res, next) => {
        const { bill_number } = req.body;

        if (!bill_number) {
            return next();
        }

        try {
            const purchaseService = new PurchaseService();
            const purchaseData = await purchaseService.findPurchaseByParam({
                bill_number,
            });

            if (purchaseData) {
                return res
                    .status(400)
                    .json({ message: "Purchase with this bill already exists" });
            }
            next();
        } catch (err) {
            console.error("Error in validateExistence middleware:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    checkPurchaseAvailable: async (req, res, next) => {
        const { purchase_id } = req.body;

        try {
            const purchaseService = new PurchaseService();
            const master_purchase = await purchaseService.findPurchaseByParam({
                purchase_id,
            });

            if (!master_purchase || master_purchase.length === 0) {
                return res.status(400).json({ message: "Purchase not found" });
            }

            const purchase_details = await purchaseService.findAllPurchaseDetailsByParam({
                purchase_id,
            })
            
            req["purchase_data"] = purchase_details;
            next();
        } catch (err) {
            console.error("Error in validateExistence middleware:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = {
    userValidator,
    weightValidator,
    productValidator,
    purchaseValidator,
};
