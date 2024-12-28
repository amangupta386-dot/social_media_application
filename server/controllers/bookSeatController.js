const Seat = require('../models/seat'); // Import the Seat model

const bookSeat = async (req, res) => {
    try {
        // Extract the userId from the authenticated request
        const userId = req.user.id;

        // Extract the bookedSeats from the request body
        const { bookedSeats } = req.body; // Expecting an array of seat numbers

        // Check if there is an existing booking for the user
        const seats = await Seat.findOne({ where: { userId } });

        if (!seats) {
            // Create a new booking for the user if no previous booking exists
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
        // Extract the userId from the authenticated request
        const userId = req.user.id;

        // Reset the seat bookings for the specific user by setting bookedSeats to an empty array
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

