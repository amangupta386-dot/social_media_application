const Seat = require('../models/seat'); 

const getSeats = async (req, res) => {
    try {
        // Get the user ID from the request object
        const userId = req.user.id;

        // Fetch the seats data for the given user ID
        const seats = await Seat.findOne({ where: { userId } });

        // If no seats are found, return a 404 response
        if (!seats) {
            return res.status(404).json({ message: `No seats found for user ID ${userId}.` });
        }

        // Return the seat data
        return res.status(200).json({
            message: `Seats retrieved successfully for user ID ${userId}.`,
            seat: seats,
        });
    } catch (error) {
        console.error('Error fetching seats:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const bookSeat = async (req, res) => {
    try {
        
        const userId = req.user.id;

        const { bookedSeats } = req.body;

          
          if (!Array.isArray(bookedSeats)) {
            return res.status(400).json({ message: "Invalid input: bookedSeats must be an array." });
        }

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

module.exports = { getSeats, bookSeat, resetSeats };

