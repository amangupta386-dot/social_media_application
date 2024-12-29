const sequelize = require('../config/db');
const Booking = require('../models/booking');
const Seat = require('../models/seat'); 

const getSeats = async (req, res) => {
    try {
        // Fetch all booked seats from the Seat table
        const bookedSeats = await Seat.findAll({
            attributes: ['number'], // Only fetch the seat numbers
        });

        // Map the results to an array of seat numbers
        const seatNumbers = bookedSeats.map((seat) => seat.number);

        return res.status(200).json({ bookedSeats: seatNumbers });
    } catch (error) {
        console.error("Error fetching booked seats:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




const bookSeat = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookedSeats } = req.body;

        if (!Array.isArray(bookedSeats)) {
            return res.status(400).json({ message: "Invalid input: bookedSeats must be an array." });
        }

        const createdSeats = await Seat.bulkCreate(
            bookedSeats.map((number) => ({ number })),
            { returning: true }
        );

        await Booking.bulkCreate(
            createdSeats.map((seat) => ({
                userId,
                seatId: seat.id,
            }))
        );

        return res.status(201).json({ message: "Seats booked successfully." });
    } catch (error) {
        console.error("Error booking seat:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const resetSeats = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        // Destroy all bookings and seats
        await Booking.destroy({ where: {}, transaction });
        await Seat.destroy({ where: {}, transaction });

        await transaction.commit(); // Commit the transaction

        return res.status(200).json({
            message: "All bookings and seats have been reset successfully.",
        });
    } catch (error) {
        await transaction.rollback(); // Rollback the transaction in case of error
        console.error("Error resetting seats:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



module.exports = { getSeats, bookSeat, resetSeats };

