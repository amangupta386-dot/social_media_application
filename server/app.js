const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./config/passportConfig');
const { connectDB } = require('./config/sequalize');

const authRoutes = require('./routes/authRoutes');
const seatBookRoutes = require('./routes/seatBookRoutes')

const app = express();
connectDB();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/seat', seatBookRoutes)


module.exports = app;
