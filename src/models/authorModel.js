const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }



}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema)