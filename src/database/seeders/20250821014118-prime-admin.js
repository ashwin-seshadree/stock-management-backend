'use strict';
const { hashPassword } = require('../../utils/util');
const { tables, user_roles } = require('../../common/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(tables.master_user, [{
      first_name: 'Prime',
      last_name: 'Admin',
      email_id: 'test@test.com',
      password: await hashPassword('Prime@1234'),
      role_id: await queryInterface.rawSelect(tables.master_user_roles, {
        where: { role_id: user_roles.super_admin },
      }, ['role_id']),
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tables.master_user, {
      email_id: 'test@test.com',
    }, {});
  }
};
