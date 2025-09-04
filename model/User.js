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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken:{
        type:String
    },
    category: {
        type: String,
        enum: ['restaurant', 'consumer','delivery agent','admin'],
        lowercase: true,
        trim: true,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model('User', userSchema)