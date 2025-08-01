const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterIventoryListView = sequelize.define('MasterIventoryListView', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: Sequelize.STRING,
    product_description: Sequelize.TEXT,
    product_weight: Sequelize.STRING,
    product_quantity: Sequelize.BIGINT,
    product_price: Sequelize.DECIMAL(10, 2),
}, {
    tableName: tables.master_inventory_list_view,
    timestamps: false,
});

MasterIventoryListView.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterIventoryListView;