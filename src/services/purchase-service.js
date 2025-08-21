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

    async findAllPurchaseByParam(data) {
        return await PurchaseModal.findAll({
            where: data
        });
    }

    async findAllPurchaseDetailsByParam(data) {
        return await PurchaseDetailsModal.findAll({
            where: data
        });
    }

    async addPurchase(data, t = null) {
        if (t) {
            return await PurchaseModal.create(data, { transaction: t });
        }
        return await PurchaseModal.create(data);
    }

    async updatePurchaseStatus(purchase_id, purchase_status, t = null) {
        const updateData = {
            purchase_status
        };

        if (t) {
            return await PurchaseModal.update(updateData, {
                where: { purchase_id },
                transaction: t
            });
        }

        return await PurchaseModal.update(updateData, {
            where: { purchase_id }
        });
    }
}

module.exports = { PurchaseService };