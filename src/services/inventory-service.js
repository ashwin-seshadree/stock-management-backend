const InventoryModal = require("../models/MasterInventoryList");

class InventoryService {
    async addItem(data) {
        return await InventoryModal.create(data);
    }

    async findInventoryItemByParams(data) {
        return await InventoryModal.findOne({
            where: data
        });
    }

    async updateStockAfterPurchase(data, t) {
        const item = await InventoryModal.findOne({
            where: { product_id: data.product_id }
        });
        
        const updatedQuantity = +item.quantity + +data.quantity;

        return await InventoryModal.update(
            { quantity: updatedQuantity },
            { where: { product_id: data.product_id }, transaction: t }
        );
    }
}

module.exports = { InventoryService };