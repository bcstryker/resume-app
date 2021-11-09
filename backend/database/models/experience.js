const mongoose = require( 'mongoose' );


const experienceSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId },
    employer: String,
    startDate: Date,
    endDate: Date,
    title: String,
    description: String
});


const experience = mongoose.model( 'workExperience', experienceSchema );

module.exports = experience;