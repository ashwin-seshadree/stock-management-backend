const { WeightService } = require('../services/weight-service.js');
const weightService = new WeightService();

module.exports = {
    async addWeight(req, res) {
        let weightData = req.body;
        try {
            const newWeight = await weightService.addWeight(weightData);

            return res.status(201).json({
                status: 'success',
                message: 'Weight added successfully',
                data: newWeight
            });
        } catch (error) {
            console.error('Error adding weight:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error while adding weight',
            });
        }
    }
}