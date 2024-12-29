const User = require('../models/user');
const { generateToken } = require('./jwtService');
const bcrypt = require('bcryptjs');



const registerUser = async (userData) => {
    const { name, email, password } = userData;
    let existingUser;

    try {
 
        existingUser = await User.findOne({ where: { email } });
    } catch (e) {
        console.log(e);
    }

    if (existingUser) {
        throw new Error('User already exists');
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await User.create({ name, email, password: hashedPassword });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return generateToken(user.toJSON());
};

module.exports = { registerUser, loginUser };
