const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 2,
        required: true
    }, middleName: {
        type: String,
        trim: true,
        minlength: 2
    }, lastName: {
        type: String,
        trim: true,
        minlength: 3
    }, email: {
        type: String,
        trim: true,
        minlength: 7
    }, address: {
        type: String,
        trim: true
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;