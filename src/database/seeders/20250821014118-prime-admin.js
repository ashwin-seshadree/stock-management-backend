'use strict';
const { hashPassword } = require('../../utils/util');
const { tables, user_roles } = require('../../common/constants');
require('dotenv').config({ path: '.env.seeder' });

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(tables.master_user, [{
      first_name: process.env.PRIME_ADMIN_FIRST_NAME || 'Prime',
      last_name: process.env.PRIME_ADMIN_LAST_NAME || 'Admin',
      email_id: process.env.PRIME_ADMIN_EMAIL,
      password: await hashPassword(process.env.PRIME_ADMIN_PASSWORD || 'PrimeAdmin@123'),
      role_id: await queryInterface.rawSelect(tables.master_user_roles, {
        where: { role_id: user_roles.super_admin },
      }, ['role_id']),
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tables.master_user, {
      email_id: process.env.PRIME_ADMIN_EMAIL,
    }, {});
  }
};
