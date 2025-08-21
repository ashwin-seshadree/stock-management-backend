'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW ${tables.master_purchase_view} AS
    SELECT 
        mp.purchase_id,
        mp.bill_number,
        mp.payment_type,
        mp.date_of_purchase,
        mp.purchase_amount,
        mp.created_at,
        mp.updated_at
    FROM
        ${tables.master_purchase} mp`)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS ${tables.master_purchase_view};
    `);
  }
};
