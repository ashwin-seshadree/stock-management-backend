const weightModal = require('../models/master-weight-chart.js');

class WeightService {
    async addWeight(weightData) {
        return await weightModal.create(weightData);
    }

    async findWeightById(weightId) {
        return await weightModal.findByPk(weightId);
    }

    async findWeightByName(weightName) {
        return await weightModal.findOne({ where: { weight: weightName } });
    }

    async updateWeight(weightId, weightData) {
        return await weightModal.update(weightData, { where: { weight_id: weightId } });
    }
}

module.exports = { WeightService };