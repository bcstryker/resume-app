const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    monthStart: String,
    yearStart: String,
    monthEnd: String,
    yearEnd: String,
    title: String,
    description: String
})

const workExperienceSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId
    }, _resume_id: {
        type: mongoose.Types.ObjectId
    }, experience: {
        type: Map,
        of: String
    }
});

const experience = mongoose.model('workExperience', workExperienceSchema);

module.exports = experience;