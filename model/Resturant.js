const mongoose = require('mongoose');

const resturantAddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },  
    pinCode: { type: String, required: true },  
    landMark: { type: String }
},{ _id: false })

const restaurantSchema = new mongoose.Schema({
    nameOfResturant: { type: String },
    address: [resturantAddressSchema],
    phoneNo: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }]
});

model.exports = mongoose.model('Resturant',restaurantSchema);