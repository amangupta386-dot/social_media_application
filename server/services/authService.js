const User = require('../models/user');
const { generateToken } = require('./jwtService');

const registerUser = async (userData, res) => {
    console.log(userData,'userData');
    
    const user = await User.create(userData);
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordValid(password))) {
        throw new Error('Invalid credentials');
    }
    return generateToken(user);
};

module.exports = { registerUser, loginUser };
