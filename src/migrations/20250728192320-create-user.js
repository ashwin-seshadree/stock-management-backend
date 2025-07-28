'use strict';

/** @type {import('sequelize-cli').Migration} */
const { tables } = require('../common/constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.user, {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: tables.master_user_roles,
          key: 'id',
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tables.user);
  }
};
