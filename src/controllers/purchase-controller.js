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
                const insertPurchaseData = await Promise.all(
                    purchaseData.purchase_items.map(async (item) => {
                        const isProductInInventory = await inventoryService.findInventoryItemByParams({
                            product_id: item.product_id,
                            weight_id: item.weight_id,
                        });
                        if (!isProductInInventory) {
                            let insertData = {
                                product_id: item.product_id,
                                weight_id: item.weight_id,
                                quantity: item.quantity,
                                price: item.selling_price,
                            };
                            await inventoryService.addItem(insertData, transaction);
                        } else {
                            await inventoryService.updateStockAfterPurchase({
                                inventory_id: isProductInInventory.id,
                                quantity: item.quantity,
                                price: item.selling_price,
                            }, transaction);
                        }

                        const returndata = {
                            product_id: item.product_id,
                            weight_id: item.weight_id,
                            quantity: item.quantity,
                            purchase_price: parseFloat(item.purchase_price),
                            purchase_date: purchaseData.purchase_date,
                            purchase_bill_number: purchaseData.purchase_bill_number || null,
                        };

                        return returndata;
                    })
                );

                const newPurchase = await purchaseService.addBulkPurchase(insertPurchaseData, transaction);

                return res.status(201).json({
                    status: 'success',
                    message: 'Purchase added successfully',
                    data: newPurchase,
                });
            });
        } catch (error) {
            console.error('Error adding purchase:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
}