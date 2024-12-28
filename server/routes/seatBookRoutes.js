const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { bookSeat, resetSeats } = require('../controllers/bookSeatController');


router.post('/seatBook', authMiddleware, bookSeat);
router.post('/bookedSeatReset', authMiddleware, resetSeats);


module.exports = router;
