'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.master_user_roles, {
      role_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    })

    await queryInterface.bulkInsert(tables.master_user_roles, [{
      role_name: 'Super Admin',
    }, {
      role_name: 'User',
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tables.master_user_roles);
  }
};
