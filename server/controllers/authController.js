const { registerUser, loginUser } = require('../services/authService');
const { verifyToken } = require('../services/jwtService');

exports.register = async (req, res) => {
    try {
        const token = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.protected = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        res.status(200).json({ message: 'Protected route accessed', user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
