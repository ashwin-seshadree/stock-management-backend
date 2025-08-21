const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterUserRoles = sequelize.define(tables.master_user_roles, {
    role_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: tables.master_user_roles,
});
module.exports = MasterUserRoles;