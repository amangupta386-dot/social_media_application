const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');


router.post('/uploadPost', feedController.uploadPost);


module.exports = router;
