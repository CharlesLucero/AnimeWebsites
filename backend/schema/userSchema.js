const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'please add firstname'],
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'please add email'],
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'please add password'],
        trim: true,
    }

},{timestamps: true}
);

module.exports = mongoose.model('User', userSchema)