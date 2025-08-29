const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['restaurant','consumer'],
        lowercase:true,
        trim:true,
        required:true
    }
})

module.exports = mongoose.model('User',userSchema)