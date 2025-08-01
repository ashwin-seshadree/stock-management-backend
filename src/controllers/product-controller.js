const { ProductService } = require('../services/product-service');
const productService = new ProductService();
const paginate = require('../services/paginate-service');
const { Op } = require('sequelize');

module.exports = {
    async createProduct(req, res) {
        let productData = req.body;

        try {
            const newProduct = await productService.createProduct(productData);
            return res.status(201).json({
                status: 'success',
                message: 'Product created successfully',
                data: newProduct
            });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getAllProducts(req, res) {
        const { page, limit, sort, column_name, search, active } = req.query;
        try {
            const productModal = require('../models/MasterProducts');
            let pageNumber = parseInt(page) || 1;
            let pageSize = parseInt(limit) || 10;
            let sortBy = column_name || 'product_name';
            let sortOrder = sort || 'ASC';
            let searchParam = search || '';
            let isActive = (active !== undefined && active !== '') ? ((active === 'true') ? true : false) : true;
            let options = {
                where: {
                    is_active: isActive,
                },
                order: [[sortBy, sortOrder]],
            }

            if (searchParam) {
                options.where[Op.or] = [
                    {
                        product_name: {
                            [Op.like]: `%${searchParam}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${searchParam}%`
                        }
                    }
                ];
            }

            const products = await paginate(productModal, options, pageNumber, pageSize);

            return res.status(200).json({
                status: 'success',
                message: 'Products fetched successfully',
                data: products.data,
                meta: products.meta
            });

        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}   