const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [{
        foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
        quantity: { type: Number, default: 1 }
    }],
    totalCost: Number,
    status: { 
        type: String, 
        enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"], 
        default: "Placed" 
    },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" }
});


module.exports = mongoose.model('Orders', ordersSchema)