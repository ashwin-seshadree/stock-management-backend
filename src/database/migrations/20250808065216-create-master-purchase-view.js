'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW ${tables.master_purchase_view} AS
    SELECT 
        mp.id,
        mpp.product_name,
        mpp.description AS product_description,
        mwc.weight AS product_weight,
        mp.quantity AS purchase_quantity,
        mp.purchase_price,
        mp.purchase_date,
        mp.purchase_bill_number
    FROM
        ${tables.master_purchase} mp
            JOIN
        ${tables.master_products} mpp ON mp.product_id = mpp.id
            JOIN
        ${tables.master_weight_chart} mwc ON mp.weight_id = mwc.id;
      `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS ${tables.master_purchase_view};
    `);
  }
};
