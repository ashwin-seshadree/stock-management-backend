const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterPurchaseView = sequelize.define('MasterPurchaseView', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: Sequelize.STRING,
    product_description: Sequelize.TEXT,
    product_weight: Sequelize.STRING,
    purchase_quantity: Sequelize.BIGINT,
    purchase_price: Sequelize.DECIMAL(10, 2),
    purchase_date: Sequelize.DATE,
    purchase_bill_number: Sequelize.STRING,
}, {
    tableName: tables.master_purchase_view,
    timestamps: false,
});

MasterPurchaseView.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterPurchaseView;