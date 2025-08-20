const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterInventoryListView = sequelize.define(tables.master_inventory_list_view, {
    inventory_id: DataTypes.BIGINT,
    product_name: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    product_weight: DataTypes.STRING,
    product_quantity: DataTypes.BIGINT,
    product_price: DataTypes.DECIMAL(10, 2),
}, {
    tableName: tables.master_inventory_list_view,
    timestamps: false,
});

MasterInventoryListView.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterInventoryListView;