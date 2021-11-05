const mongoose = require('mongoose');
const experience = require('./experience')
// const experienceSchema = experience.experienceSchema

const resumeSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId
    }, title: {
        type: String,
        trim: true
    }, skills: {
        type: Array
    }, education: {
        type: String
    }, aboutMe: {
        type: String,
        minlength: 5,
        maxlength: 1000,
        trim: true
    }, experience: {
        type: [experience.experienceSchema]
    }
});

const resume = mongoose.model('resume', resumeSchema);

module.exports = resume;