const Seat = require('../models/seat'); 

const bookSeat = async (req, res) => {
    try {
        const userId = req.user.id;

        const { bookedSeats } = req.body;

        const seats = await Seat.findOne({ where: { userId } });

        if (!seats) {
            const newSeat = await Seat.create({
                bookedSeats,
                userId,
            });

            return res.status(200).json({
                message: `Seats ${bookedSeats.join(", ")} successfully booked for user ID ${userId}.`,
                seat: newSeat,
            });
        }

        // Update the existing booking with the new seats
        const updatedSeats = [...new Set([...seats.bookedSeats, ...bookedSeats])];
        seats.bookedSeats = updatedSeats;
        await seats.save();

        return res.status(200).json({
            message: `Seats ${bookedSeats.join(", ")} successfully updated for user ID ${userId}.`,
            seat: seats,
        });
    } catch (error) {
        console.error('Error booking seat:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const resetSeats = async (req, res) => {
    try {
        const userId = req.user.id;

        const seats = await Seat.findOne({ where: { userId } });

        if (!seats) {
            return res.status(404).json({ message: `No bookings found for user ID ${userId}.` });
        }

        seats.bookedSeats = [];
        await seats.save();

        return res.status(200).json({
            message: `All bookings have been reset for user ID ${userId}.`,
            seat: seats,
        });
    } catch (error) {
        console.error('Error resetting seats:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { bookSeat, resetSeats };

