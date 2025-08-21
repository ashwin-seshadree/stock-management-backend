'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW ${tables.master_inventory_list_view} AS
      SELECT 
          mil.inventory_id,
          mp.product_name,
          mp.description AS product_description,
          mwc.weight AS product_weight,
          mil.quantity AS product_quantity,
          mil.price AS product_price
      FROM 
          ${tables.master_inventory_list} mil
      JOIN 
          ${tables.master_products} mp ON mil.product_id = mp.product_id
      JOIN 
          ${tables.master_weight_chart} mwc ON mil.weight_id = mwc.weight_id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS ${tables.master_inventory_list_view};
    `);
  }
};
