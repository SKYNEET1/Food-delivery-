const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
});

model.exports = mongoose.model('Food',foodItemSchema)