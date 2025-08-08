const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterPurchase = sequelize.define('MasterPurchase', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: tables.master_products,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tables.master_weight_chart,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    purchase_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    purchase_bill_number: {
        type: DataTypes.STRING,
        allowNull: true,
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