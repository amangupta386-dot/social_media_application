const User = require('../models/user');
const { generateToken } = require('./jwtService');

const registerUser = async (userData, res) => {
    const user = new User(userData);
    await user.save();
    return;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordValid(password))) {
        throw new Error('Invalid credentials');
    }
    return generateToken(user);
};

module.exports = { registerUser, loginUser };
