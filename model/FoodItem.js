const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    quantity: {type:String, require: true, default:0},
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
},{ timestamps: true });

model.exports = mongoose.model('Food',foodItemSchema)