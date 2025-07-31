const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tables.master_user_roles,
            key: 'id',
        },
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
}, {
    tableName: tables.user,
    timestamps: false,
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.full_name = `${values.first_name} ${values.last_name}`;
    delete values.password;
    return values;
};

module.exports = User;