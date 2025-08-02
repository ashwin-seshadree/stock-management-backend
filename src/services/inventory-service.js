const InventoryModal = require("../models/MasterInventoryList");

class InventoryService {
    async addItem(data) {
        return await InventoryModal.create(data);
    }
}

module.exports = { InventoryService };