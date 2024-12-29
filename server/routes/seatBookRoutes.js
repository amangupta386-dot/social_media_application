const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { bookSeat, resetSeats, getSeats } = require('../controllers/bookSeatController');


router.post('/seatBook', authMiddleware, bookSeat);
router.get('/seatBook', authMiddleware, getSeats);
router.post('/bookedSeatReset', authMiddleware, resetSeats);


module.exports = router;
