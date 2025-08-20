const InventoryModal = require("../models/master-inventory-list");

class InventoryService {
    async addItem(data, t) {
        return await InventoryModal.create(data, { transaction: t });
    }

    async findInventoryItemByParams(data) {
        return await InventoryModal.findOne({
            where: data
        });
    }

    async updateStock(data, t, is_cancellation = false) {
        const item = await InventoryModal.findOne({
            where: { id: data.inventory_id }
        });
        let updatedQuantity;
        let updateData = {}
        if (is_cancellation) {
            updatedQuantity = +item.quantity - +data.quantity;
            updateData['quantity'] = updatedQuantity;
        } else {
            updatedQuantity = +item.quantity + +data.quantity;
            updateData['quantity'] = updatedQuantity;
            updateData['price'] = data.price;
        }

        return InventoryModal.update(
            updateData,
            { where: { id: data.inventory_id }, transaction: t }
        );
    }
}

module.exports = { InventoryService };