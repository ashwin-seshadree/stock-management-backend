const PurchaseModal = require("../models/master-purchase");
const PurchaseDetailsModal = require("../models/master-purchase-details");

class PurchaseService {
    async addBulkPurchaseDetails(data, t = null) {
        if (t)
            return await PurchaseDetailsModal.bulkCreate(data, { transaction: t });

        return await PurchaseDetailsModal.bulkCreate(data);
    }

    async addPurchaseDetails(data, t = null) {
        if (t)
            return await PurchaseDetailsModal.create(data, { transaction: t });

        return await PurchaseDetailsModal.create(data);
    }

    async findPurchaseByParam(data) {
        return await PurchaseModal.findOne({
            where: data
        });
    }

    async findManyPurchaseByParam(data) {
        return await PurchaseModal.findAll({
            where: data
        });
    }

    async addPurchase(data, t = null) {
        if (t) {
            return await PurchaseModal.create(data, { transaction: t });
        }
        return await PurchaseModal.create(data);
    }
}

module.exports = { PurchaseService };