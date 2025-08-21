const masterProductsModal = require('../models/master-products');

class ProductService {
    async createProduct(productData) {
        return await masterProductsModal.create(productData);
    }

    async findProductById(productId) {
        return await masterProductsModal.findByPk(productId);
    }

    async findProductByName(productName) {
        return await masterProductsModal.findOne({ where: { product_name: productName } });
    }

    async getAllProducts(filter = {}) {
        let products = await masterProductsModal.findAll({ where: { is_active: filter.active || true }, order: [[`${filter.column_name || 'product_name'}`, `${filter.sort || 'ASC'}`]] });
        console.log('Products fetched:', products);
        return products;
    }

    async updateProduct(productId, productData) {
        return await masterProductsModal.update(productData, { where: { product_id: productId } });
    }
}

module.exports = { ProductService };