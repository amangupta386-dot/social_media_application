const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address',
        ],
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if googleId is not set
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true 
    }, 
    profilePic: {
        type: String,
        default: null
    }
});

// Create a sparse index for profilePic
UserSchema.index({ profilePic: 1 }, { sparse: true });

// Hash the password if it is modified
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
