const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Resturant" },
        items: [{
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
            quantity: { type: Number, default: 1 }
        }],
    totalCost: Number,
    foodStatus: {
        type: String,
        enum: ["Placed", "Delivered"],
        default: "Placed"
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryProfile",
        default: null
    },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
    otp: {type:String}
},{ timestamps: true });


module.exports = mongoose.model('Order', orderSchema)