const { required } = require('joi');
const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        enum: ['Veg', 'Non Veg'],
        default: 'Non Veg'
    },
    activeAddress: {
        type: Array,
        default: []
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Orders'
    }]
},{ timestamps: true })

module.exports = mongoose.model('Consumer', consumerSchema)
// make the orders to currentorder and keept the document extracted from orders...