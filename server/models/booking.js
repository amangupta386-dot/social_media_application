const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Seat = require('./seat');

const Booking = sequelize.define(
    'Booking',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Seat,
                key: 'id',
            },
        },
    },
    {
        tableName: 'Bookings',
    }
);


module.exports = Booking;
