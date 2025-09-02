const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['restaurant', 'consumer','delivery agent'],
        lowercase: true,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)