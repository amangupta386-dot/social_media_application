const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
require('./config/passportConfig');

const authRoutes = require('./routes/authRoute');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);

module.exports = app;
