const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { bookSeat, resetSeats } = require('../controllers/bookSeatController');


router.post('/bookedSeats', authMiddleware, bookSeat);
router.post('/resetBookedSeats', authMiddleware, resetSeats);


module.exports = router;
