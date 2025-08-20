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
        type: Sequelize.ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'),
        allowNull: false,
        defaultValue: 'CASH',
      },
      date_of_purchase: {
        type: Sequelize.DATE,
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
