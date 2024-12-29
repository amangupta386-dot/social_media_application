const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seat = sequelize.define(
    'Seat',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bookedSeats: {
            type: DataTypes.ARRAY(DataTypes.INTEGER), // For PostgreSQL
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique:true
        },
    },
    {
        tableName: 'Seats',
    }
);

module.exports = Seat;
