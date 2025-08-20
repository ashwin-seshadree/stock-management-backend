'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.master_purchase_details, {
      purchase_detail_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: tables.master_purchase,
          key: 'purchase_id',
        }
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: tables.master_products,
          key: 'product_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      weight_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: tables.master_weight_chart,
          key: 'weight_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tables.master_purchase_details);
  }
};
