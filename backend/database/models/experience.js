const mongoose = require( 'mongoose' );


const experienceSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId },
    employer: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    resumeDescriptions: Object,
});


const experience = mongoose.model( 'workExperience', experienceSchema );

module.exports = experience;