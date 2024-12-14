const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    captions: {
        type: String,
        required: true
    },
    media: [
        {
            url: String, 
            type: String 
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        }
    ],
    shareCount: {
        type: Number,
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Middleware to set updatedAt timestamp
FeedSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Method to increment share count
FeedSchema.methods.incrementShareCount = function () {
    this.shareCount += 1;
    return this.save();
};

const Feed = mongoose.model("Feed", FeedSchema);

module.exports = Feed;
