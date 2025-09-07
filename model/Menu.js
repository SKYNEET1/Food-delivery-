const { required } = require("joi");
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    description: {
        type: String,
        trim: true,
        lowercase:true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    foodType: {
        type: String,
        enum: ["Veg", "Non Veg"],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    quantity:{
        type: Number,
        required:true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, { timestamps: true });

const menuItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
        unique: true
    },
    foodProvided: [foodSchema]
}, { timestamps: true })

module.exports = mongoose.model("Menu", menuItemSchema);
