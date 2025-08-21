const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { tables } = require('../common/constants');

const MasterUser = sequelize.define(tables.master_user, {
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: tables.master_user_roles,
            key: 'role_id',
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
    tableName: tables.master_user,
    timestamps: false,
});

MasterUser.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.full_name = `${values.first_name} ${values.last_name}`;
    delete values.password;
    return values;
};

module.exports = MasterUser;