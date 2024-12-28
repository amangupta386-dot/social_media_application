const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('Missing or malformed Authorization header');
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded Token:', decoded);

        // Fetch user data from the database
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            console.error('User not found for decoded token:', decoded);
            return res.status(401).json({ error: 'Invalid token or user not found' });
        }

        req.user = user;
        req.authToken = token;

        next();
    } catch (err) {
        console.error('Error in authMiddleware:', err.message);
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

module.exports = authMiddleware;
