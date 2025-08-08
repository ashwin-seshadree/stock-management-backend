const PurchaseModal = require("../models/MasterPurchase");

class PurchaseService {
    async addBulkPurchase(data, t) {
        return await PurchaseModal.bulkCreate(data, { transaction: t });
    }

    async findPurchaseByParam(data) {
        return await PurchaseModal.findOne({
            where: data
        });
    }
}

module.exports = { PurchaseService };