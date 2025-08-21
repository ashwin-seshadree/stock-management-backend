const paginate = require('../services/paginate-service');
const { Op } = require('sequelize');

module.exports = {
    getAllInventoryItems: async (req, res) => {
        const { page, limit, sort, column_name, search } = req.query;

        try {
            const inventoryView = require('../models/master-inventory-list-view');
            let pageNumber = parseInt(page) || 1;
            let pageSize = parseInt(limit) || 10;
            let sortBy = column_name || 'product_name';
            let sortOrder = sort || 'ASC';
            let searchParam = search || '';
            let options = {
                order: [[sortBy, sortOrder]],
            }

            if (searchParam) {
                options.where = [
                    {
                        product_name: {
                            [Op.like]: `%${searchParam}%`
                        }
                    }
                ];
            }

            const products = await paginate(inventoryView, options, pageNumber, pageSize);

            return res.status(200).json({
                status: 'success',
                message: 'Products fetched successfully',
                data: products.data,
                meta: products.meta
            });

        } catch (error) {
            console.error('Error fetching inventory items:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}