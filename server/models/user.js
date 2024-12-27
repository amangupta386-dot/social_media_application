const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profilePic: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        fieldName: {
            type: DataTypes.STRING,
            defaultValue: () => Math.round(Math.random() * 1000).toString(),
        },
    },
    {
        tableName: 'Users', // Explicitly define the table name
    }
);

User.prototype.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password);
};


module.exports = User;
