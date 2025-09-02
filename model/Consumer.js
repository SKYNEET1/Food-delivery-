const { required } = require('joi');
const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name: {type: String},
    phoneNo: {type: Number},
    email: {type: String},
    category: {type: String},
    gender:{
        type:String,
        enum:['male','female']
    },
    age:{
        type:Number,
        required:true
    },
    activeAddress:{type:String},
    addresses: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'AddressOfConsumer'
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId, ref: 'Orders'
    }]
})

module.exports = mongoose.model('Consumer', consumerSchema)