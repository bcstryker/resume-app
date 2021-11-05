const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    }, middleName: {
        type: String,
        trim: true
    }, lastName: {
        type: String,
        trim: true
    }, email: {
        type: String,
        trim: true
    }, address: {
        type: String,
        trim: true
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;