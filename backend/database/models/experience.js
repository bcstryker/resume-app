const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId }, 
    _resumeId: { type: mongoose.Types.ObjectId },
    employer: String,
    monthStart: String,
    yearStart: String,
    monthEnd: String,
    yearEnd: String,
    title: String,
    description: String
});

// const workExperienceSchema = new mongoose.Schema({
//     _userId: {
//         type: mongoose.Types.ObjectId
//     }, _resumeId: {
//         type: mongoose.Types.ObjectId
//     }, experience: {
//         type: Map,
//         of: String
//     }
// });

const experience = mongoose.model('workExperience', experienceSchema);

module.exports = experience;