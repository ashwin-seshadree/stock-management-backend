const PurchaseModal = require("../models/MasterPurchase");

class PurchaseService {
    async addPurchase(data, t) {
        return await PurchaseModal.create(data, { transaction: t });
    }

    async findPurchaseByParam(data) {
        return await PurchaseModal.findOne({
            where: data
        });
    }
}

module.exports = { PurchaseService };