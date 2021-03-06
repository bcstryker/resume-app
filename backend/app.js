const express = require('express');
const app = express();
const mongoose = require('./database/mongoose.js');
const user = require('./database/models/user');
const resume = require('./database/models/resume');
const experience = require('./database/models/experience');

/*
CORS - Cross Origin Resource Sharing
Backend - http://localhost:3000
Frontend - http://localhost:4200
*/

// Add headers before the routes are defined
app.use( ( req, res, next ) => {
  
  // Website you wish to allow to connect
  res.setHeader( 'Access-Control-Allow-Origin', '*' );  
  // Request methods you wish to allow
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
  // Request headers you wish to allow
  res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
  
  /* User Authentication
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  */
  
  // Pass to next layer of middleware
  next();
});

app.use( express.json() );

// ________________________ user Routes __________________________________

// POST create a new user
app.post( '/portal', async ( req, res ) => {
  let userObject = {
    'firstName': req.body.firstName,
    'middleName': req.body.middleName,
    'lastName': req.body.lastName,
    'email': req.body.email,
    'address': req.body.address
  };
    const responseUserObject = await user( userObject ).save()
      .catch( err => console.log( err ));
    res.status( 201 ).send( responseUserObject );
  });
  
// GET one user
app.get( '/portal/:userId', async ( req, res ) => {
  const [ responseUser ] = await user.find( { _id: req.params.userId } )
    .catch( err => console.log( err ));
  res.status( 200 ).send( responseUser );
});

// GET all users
app.get( '/portal', async ( req, res ) => {
  const allUsers = await user.find({})
    .catch(err => console.log( err ));
  res.status( 200 ).send( allUsers );
});

// PATCH update existing user data
app.patch( '/portal/:userId', async ( req, res ) => {
  const [ updatedUserData ] = await Promise.all([
    user.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { 'new': true })
      .catch( ( error ) => { console.log( error ) } )
  ]);      
    res.status( 200 ).send( updatedUserData );
});

// DELETE a user and associated resumes
app.delete( '/portal/:userId', async ( req, res ) => {
  const [ deletedUser ] = await Promise.all([
    user.findByIdAndDelete( req.params.userId )
      .catch( err => console.log(err)),
    experience.findByIdAndDelete({ _userId: req.params.userId })
      .catch( err => console.log(err)),
    resume.deleteMany({ _userId: req.params.userId })
      .catch( err => console.log( err ))
  ]);
  res.status( 200 ).send( deletedUser );
});

// __________________________ experience Routes ____________________________________

// POST create an experience entry for a resume for a user
app.post( '/portal/:userId/experience', async ( req, res ) => {
  let expObject = {
    '_userId': req.params.userId,
    'employer': req.body.employer,
    'startDate': req.body.startDate,
    'endDate': req.body.endDate,
    'title': req.body.title,
    'description': req.body.description
  }; 
  console.log( expObject )
  const responseExpObject = await experience( expObject ).save()
    .catch( err => console.log( err ));
  res.status( 201 ).send( responseExpObject );
});

// GET all experiences from a resume
app.get( '/portal/:userId/experience', async ( req, res ) => {
  const experienceResponse = await experience.find({
    _userId: req.params.userId,
  }).catch( err => console.log( error ) );
  res.status( 200 ).send( experienceResponse );
});

// GET one experience from a resume
app.get( '/portal/:userId/experience/:experienceId', async ( req, res ) => {
    const experienceResponse = await experience.findOne({
      _userId: req.params.userId,
      _id: req.params.experienceId
    }).catch( err => console.log( error ) );
    res.status( 200 ).send( experienceResponse );
  });

// PATCH update one experience for one User
app.patch( '/portal/:userId/experience/:experienceId', async ( req, res ) => {
    const updatedExperience = await experience.findOneAndUpdate({
      _userId: req.params.userId,
      _id: req.params.experienceId }, 
      { $set: req.body }, 
      { 'new': true }
    ).catch( err => console.log( err ));
    res.status( 201 ).send( updatedExperience );
  });

// Delete one experience from a User
app.delete( '/portal/:userId/experience/:experienceId', async ( req, res ) => {
  const experienceResponse = await experience.findOneAndDelete({
    _userId: req.params.userId,
    _id: req.params.experienceId
    }).catch( err => console.log( error ) );
  res.status( 200 ).send( experienceResponse );
});

// Delete all experiences from a User
app.delete( '/portal/:userId/experience', async ( req, res ) => {
  const deletedExperiences = await experience.deleteMany({
    _userId: req.params.userId,
  }).catch( error => console.log( error ));
  res.status( 201 ).send( deletedExperiences );
  });

// __________________________ resume Routes ____________________________________

// POST create a new resume for a given user
app.post( '/portal/:userId/resumes', async ( req, res ) => {
  const resumeData = {
    '_userId': req.params.userId,
    'title': req.body.title,
    'skills': req.body.skills,
    'education': req.body.education,
    'about_me': req.body.about_me
  }
  const newResume = await resume( resumeData ).save()
    .catch( error => console.log( error ));
  res.status( 200 ).send( newResume );
});

// GET one resume from one user
app.get( '/portal/:userId/resumes/:resumeId', async ( req, res ) => {
  const thisResume = await resume.findOne({
    _userId: req.params.userId, _id: req.params.resumeId})
      .catch( err => console.log( error ));
  res.status( 200 ).send( thisResume );
});

// GET all resumes from one user
app.get( '/portal/:userId/resumes/', async ( req, res ) => {
  const resumes = await resume.find( { _userId: req.params.userId} )
    .catch( err => console.log(error) );
  res.status( 200 ).send( resumes );
});

// PATCH edit resume
app.patch( '/portal/:userId/resumes/:resumeId', async ( req, res ) => {
  const updatedResume = await resume.findOneAndUpdate({
    _userId: req.params.userId, 
    _id: req.params.resumeId}, 
    { $set: req.body },
    { 'new': true }
  ).catch( err => console.log( err ) );
  res.status( 201 ).send( updatedResume );
});

// Patch add an experience to a resume
app.patch( '/portal/:userId/resumes/:resumeId/addExperience', async ( req, res ) => {
  const updatedResume = await resume.findOneAndUpdate({
    _userId: req.params.userId, 
    _id: req.params.resumeId}, 
    { $push: { _experienceArray: req.body.experienceId } }, 
    { 'new': true }
  ).catch( err => console.log( err ));
  console.log(req.body);
  res.status( 201 ).send( updatedResume );
});

// Patch remove an experience from a resume
app.patch( '/portal/:userId/resumes/:resumeId/removeExperience', async ( req, res ) => {
  const updatedResume = await resume.findOneAndUpdate({
    _userId: req.params.userId, 
    _id: req.params.resumeId}, 
    { $pull: { _experienceArray: {$in: [req.body.experienceId]} } }, 
    { 'new': true }
  ).catch( err => console.log( err ) );
  res.status( 201 ).send( updatedResume );
});

// DELETE a resume from a user
app.delete( '/portal/:userId/resumes/:resumeId', async ( req, res ) => {
  const deletedResume = await resume.findOneAndDelete({
    _userId: req.params.userId, 
    _id: req.params.resumeId
  }).catch( ( error ) => console.log( error ) );
  res.status( 201 ).send( deletedResume );
});

// DELETE all resumes from a user
app.delete( '/portal/:userId/resumes', async ( req, res ) => {
  const deletedResumes = await resume.deleteMany(
    { _userId: req.params.userId }
  ).catch( error => console.log( error ) );
  res.status( 201 ).send( deletedResumes );
});



app.listen( 3000, () => {
    console.log( 'Server starter on port 3000' );
});
