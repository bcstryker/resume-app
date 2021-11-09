const mongoose = require( 'mongoose' );


const resumeSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId },
    _experienceArray: { type: [ mongoose.Types.ObjectId ] },
    title: { type: String, trim: true }, 
    skills: { type: Array },
    education: { type: String }, 
    aboutMe: { type: String, minlength: 5, maxlength: 1000, trim: true }, 
});

const resume = mongoose.model( 'resume', resumeSchema );

module.exports = resume;