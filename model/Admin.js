const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    empId:{
        type:String,
        unique:true,
        required:true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        required: true
    },
    blockedConsumer: {
        type: Array,
        default: []
    },
    blockedResturant: {
        type: Array,
        default: []
    },
    blockedDeliveryAgent: {
        type: Array,
        default: []
    }
},{ timestamps: true })

module.exports = mongoose.model('Admin',adminSchema)