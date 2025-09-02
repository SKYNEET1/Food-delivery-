const { ref } = require('joi');
const mongoose = require('mongoose');

const useraAddressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pinCode: { type: String, required: true, trim: true },
    landMark: { type: String, trim: true },
    active: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home', trim: true
    },
    phoneNo: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('ConsumerAddress', useraAddressSchema)