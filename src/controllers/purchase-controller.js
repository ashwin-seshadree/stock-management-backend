const sequelize = require('../config/database');
const { PurchaseService } = require('../services/purchase-service');
const { InventoryService } = require('../services/inventory-service');
const inventoryService = new InventoryService();
const purchaseService = new PurchaseService();

module.exports = {
    addPurchase: async (req, res) => {
        const purchaseData = req.body;

        try {
            await sequelize.transaction(async (transaction) => {
                const isProductInInventory = await inventoryService.findInventoryItemByParams({ product_id: purchaseData.product_id });
                if (!isProductInInventory) {
                    return res.status(404).json({ message: 'Product not found in inventory' });
                }
                const newPurchase = await purchaseService.addPurchase(purchaseData, transaction);
                await inventoryService.updateStockAfterPurchase({ product_id: newPurchase.product_id, quantity: newPurchase.quantity }, transaction);
                return res.status(201).json({
                    status: 'success',
                    message: 'Purchase added successfully',
                    data: newPurchase
                });
            });
        } catch (error) {
            console.error('Error adding purchase:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
}