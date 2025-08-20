const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterPurchaseDetails = sequelize.define(tables.master_purchase_details, {
    purchase_detail_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    purchase_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: tables.master_purchase,
            key: 'purchase_id',
        }
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: tables.master_products,
            key: 'product_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tables.master_weight_chart,
            key: 'weight_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    purchase_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    purchase_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    tableName: tables.master_purchase_details,
    timestamps: false,
});

MasterPurchaseDetails.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports = MasterPurchaseDetails;