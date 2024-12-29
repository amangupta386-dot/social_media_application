const User = require('../models/user');
const { registerUser, loginUser } = require('../services/authService');
const { verifyToken, generateToken } = require('../services/jwtService');

exports.register = async (req, res) => {
    try {
        await registerUser(req.body); 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token, });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.protected = (req, res) => {
    try {
        res.status(200).json({
            message: 'Protected route accessed',
            user: req.user,
            token: req.authToken,
        });
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};


// exports.googleSignIn = async (req, res) => {
//     const { email, googleId, name, profilePic } = req.body;
//     try {
//         let user = await User.findOne({ where: { email } });
//         if (user) {
//             if (!user.googleId) {
//                 user.googleId = googleId;
//                 await user.save();
//             }
//         } else {
//             user = await User.create({ email, googleId, name, profilePic });
//         }
//         const userToken = generateToken(user.toJSON()); // Convert to plain object
//         res.status(200).json({ message: "Google login successful", token: userToken });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

