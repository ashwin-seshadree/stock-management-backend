const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables, enums } = require('../common/constants');

const MasterPurchase = sequelize.define(tables.master_purchase, {
    purchase_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    bill_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_type: {
        type: DataTypes.ENUM(...enums.payment_types),
        allowNull: false,
        defaultValue: 'CASH',
    },
    date_of_purchase: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    purchase_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    purchase_status: {
        type: DataTypes.ENUM(...enums.purchase_status),
        allowNull: false,
        defaultValue: 'pending',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
}, {
    tableName: tables.master_purchase,
    timestamps: false,
});

MasterPurchase.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterPurchase;