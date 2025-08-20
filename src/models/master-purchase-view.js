const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterPurchaseView = sequelize.define(tables.master_purchase_view, {
    purchase_id: DataTypes.BIGINT,
    bill_number: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    date_of_purchase: DataTypes.DATE,
    purchase_amount: DataTypes.DECIMAL(10, 2),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
}, {
    tableName: tables.master_purchase_view,
    timestamps: false,
});

MasterPurchaseView.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterPurchaseView;