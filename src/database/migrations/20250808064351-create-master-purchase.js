'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.master_purchase, {
      purchase_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      bill_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_type: {
        type: Sequelize.ENUM('cash', 'credit_card', 'debit_card', 'net_banking'),
        allowNull: false,
        defaultValue: 'cash',
      },
      date_of_purchase: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      purchase_amount: {
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
    await queryInterface.dropTable(tables.master_purchase);
  }
};
