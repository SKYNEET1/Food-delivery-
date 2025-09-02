const mongoose = require('mongoose');

const useraAddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },  
    pinCode: { type: String, required: true },  
    landMark: { type: String }
},{ _id: false })

const consumerSchema = new mongoose.Schema({
    name: {type: String},
    phoneNo: {type: Number},
    email: {type: String},
    category: {type: String},
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'
    },
    address: [useraAddressSchema],
    orders:[{
        type:mongoose.Schema.Types.ObjectId, ref: 'Orders'
    }]
})

module.exports = mongoose.model('Consumer', consumerSchema)