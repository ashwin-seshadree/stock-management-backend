const weightModal = require('../models/MasterWeight.js');

class WeightService {
    async addWeight(weightData) {
        return await weightModal.create(weightData);
    }

    async findWeightById(weightId) {
        return await weightModal.findOne({ where: { id: weightId } });
    }

    async findWeightByName(weightName) {
        return await weightModal.findOne({ where: { weight: weightName } });
    }

    async updateWeight(weightId, weightData) {
        return await weightModal.update(weightData, { where: { id: weightId } });
    }
}

module.exports = { WeightService };