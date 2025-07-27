const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterUserRoles = sequelize.define('MasterUserRoles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: tables.master_user_roles,
});

MasterUserRoles.afterSync(async () => {
    await MasterUserRoles.bulkCreate([
        { role_name: 'Super Admin' },
        { role_name: 'User' }])
})

module.exports = MasterUserRoles;