const { InventoryService } = require("../services/inventory-service");
const inventoryService = new InventoryService();
const paginate = require('../services/paginate-service');
const { Op } = require('sequelize');

module.exports = {
    addInventory: async (req, res) => {
        const itemData = req.body;

        try {
            const newItem = await inventoryService.addItem(itemData);
            return res.status(201).json({
                status: 'success',
                message: 'Item added successfully',
                data: newItem
            });
        } catch (error) {
            console.error('Error adding item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllInventoryItems: async (req, res) => {
        const { page, limit, sort, column_name, search } = req.query;

        try {
            const productViewModal = require('../models/MasterInventoryListView');
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

            const products = await paginate(productViewModal, options, pageNumber, pageSize);

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