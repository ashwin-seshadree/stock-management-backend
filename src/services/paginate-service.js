/**
 * Reusable pagination helper for Sequelize models
 * @param {Model} model - Sequelize model
 * @param {Object} options - Sequelize findAndCountAll options (e.g. where, include, order)
 * @param {Number} page - Current page number (default 1)
 * @param {Number} pageSize - Items per page (default 10)
 * @returns {Object} - Paginated result with data and meta
 */

async function paginate(model, options = {}, page = 1, pageSize = 10) {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    const result = await model.findAndCountAll({
        ...options,
        limit,
        offset
    });

    return {
        data: result.rows,
        meta: {
            totalItems: result.count,
            currentPage: page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize)
        }
    };
}

module.exports = paginate;
