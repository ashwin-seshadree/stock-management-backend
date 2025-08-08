const InventoryModal = require("../models/MasterInventoryList");

class InventoryService {
    async addItem(data, t) {
        return await InventoryModal.create(data, { transaction: t });
    }

    async findInventoryItemByParams(data) {
        return await InventoryModal.findOne({
            where: data
        });
    }

    async updateStockAfterPurchase(data, t) {
        const item = await InventoryModal.findOne({
            where: { id: data.inventory_id }
        });

        const updatedQuantity = +item.quantity + +data.quantity;

        return InventoryModal.update(
            { quantity: updatedQuantity },
            { where: { id: data.inventory_id }, transaction: t }
        );
    }
}

module.exports = { InventoryService };