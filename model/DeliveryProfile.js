const mongoose = require("mongoose");

const deliveryAgentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    agentName: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true // available to take orders
    },
    deliveries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: []
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("DeliveryProfile", deliveryAgentProfileSchema);
