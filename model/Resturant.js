const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nameOfResturant: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: String
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }, // will show the average rating in its profile...
    menu: [{
        item: {
            type: mongoose.Schema.Types.ObjectId, ref: "Menu"
        },
        foodName: {
            type: String
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resturant', restaurantSchema);