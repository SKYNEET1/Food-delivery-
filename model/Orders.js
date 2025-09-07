const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
        items: [{
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
            quantity: { type: Number, default: 1 }
        }],
    totalCost: Number,
    foodStatus: {
        type: String,
        enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"],
        default: "Placed"
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
    },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" }
},{ timestamps: true });


module.exports = mongoose.model('Order', orderSchema)