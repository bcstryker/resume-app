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
app.use((req, res, next) => {
  
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //'Origin', 'X-Requested-With, Content-Type, Accept');
  
  /* User Authentication
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  */
  
  // Pass to next layer of middleware
  next();
});

app.use(express.json());

// ________________________ user Routes __________________________________

// POST create a new user
app.post('/portal', async (req, res) => {
  let userObject = {
    'firstName': req.body.firstName,
    'middleName': req.body.middleName,
    'lastName': req.body.lastName,
    'email': req.body.email,
    'address': req.body.address
  };
    const responseUserObject = await user(userObject).save()
      .catch(err => console.log(err));
    res.status(201).send(responseUserObject);
  });
  
// GET one user
app.get('/portal/:userId', async (req, res) => {
  const [responseUser] = await user.find({_id: req.params.userId})
    .catch(err => console.log(err));
  res.status(200).send(responseUser);
});

// GET all users
app.get('/portal', async (req, res) => {
  const allUsers = await user.find({})
    .catch(err => console.log(err));
  res.status(200).send(allUsers);
});

// PATCH update existing user data
app.patch('/portal/:userId', async (req, res) => {
  const [updatedUserData] = await Promise.all([
    user.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {'new': true})
      .catch((error) => {console.log(error)})
  ]);      
    res.status(200).send(updatedUserData);
});

// DELETE a user and associated resumes
app.delete('/portal/:userId', async (req, res) => {
  const [deletedUser] = await Promise.all([
    user.findByIdAndDelete(req.params.userId)
      .catch(err => console.log(err)),
    resume.deleteMany({_userId: req.params.userId})
      .catch(err => console.log(err))
  ]);
  res.status(200).send(deletedUser);
});

// __________________________ resume Routes ____________________________________

// POST create a new resume for a given user
app.post('/portal/:userId/resumes', async (req, res) => {
//   const thisUser = await user.findById(req.params.userId)
//     .catch(err => console.log(err));
//   console.log(thisUser.first_name);
  const resumeData = {
    '_userId': req.params.userId,
    'skills': req.body.skills,
    'education': req.body.education,
    'about_me': req.body.about_me
  }
  const newResume = await resume(resumeData).save()
    .catch(error => console.log(error));
  res.status(200).send(newResume);
});

// GET one resume from one user
app.get('/portal/:userId/resumes/:resumeId', async (req, res) => {
  const thisResume = await resume.findOne({
    _userId: req.params.userId, _id: req.params.resumeId})
      .catch(err => console.log(error));
  res.status(200).send(thisResume);
});

// GET all resumes from one user
app.get('/portal/:userId/resumes/', async (req, res) => {
  const resumes = await resume.find({_userId: req.params.userId})
    .catch(err => console.log(error));
  res.status(200).send(resumes);
});

// PATCH update one resume
app.patch('/portal/:userId/resumes/:resumeId', async (req, res) => {
  const updatedTask = await resume.findOneAndUpdate({
    _userId: req.params.userId, 
    _id: req.params.resumeId}, 
    {$set: req.body}, 
    {'new': true}
  ).catch(err => console.log(err));
  res.status(201).send(updatedTask);
});

// DELETE a resume from a user
app.delete('/portal/:userId/resumes/:resumeId', async (req, res) => {
  const deletedResume = await resume.findOneAndDelete({
    _userId: req.params.userId, 
    _id: req.params.resumeId
  }).catch((error) => console.log(error));
  res.status(201).send(deletedResume);
});

// DELETE all resumes from a user
app.delete('/portal/:userId/resumes', async (req, res) => {
  const deletedResumes = await resume.deleteMany(
    {_userId: req.params.userId}
  ).catch(error => console.log(error));
  res.status(201).send(deletedResumes);
});

// __________________________ experience Routes ____________________________________

// POST create an experience entry for a resume for a user
app.post('/portal/:userId/resumes/:resumeId/experience', async (req, res) => {
  let expObject = {
    '_userId': req.params.userId,
    '_resumeId': req.params.resumeId,
    'experience': {
      'monthStart': req.body.experience.monthStart,
      'yearStart': req.body.experience.yearStart,
      'monthEnd': req.body.experience.monthEnd,
      'yearEnd': req.body.experience.yearEnd,
      'title': req.body.experience.title,
      'description': req.body.experience.description
    }
  };
  console.log(expObject)
  const responseExpObject = await experience(expObject).save()
    .catch(err => console.log(err));
  res.status(201).send(responseExpObject);
});

// GET all experiences from a resume
app.get('/portal/:userId/resumes/:resumeId/experience', async (req, res) => {
  const experienceResponse = await experience.find({
    _userId: req.params.userId,
    _resumeId: req.params.resumeId
  })
    .catch(err => console.log(error));
  res.status(200).send(experienceResponse);
});

// GET one experience from a resume
app.get('/portal/:userId/resumes/:resumeId/experience/:experienceId', async (req, res) => {
    const experienceResponse = await experience.find({
      _userId: req.params.userId,
      _resumeId: req.params.resumeId,
      _id: req.params.experienceId
    })
      .catch(err => console.log(error));
    res.status(200).send(experienceResponse);
  });

// PATCH update one experience on one resume
app.patch('/portal/:userId/resumes/:resumeId/experience/:experienceId', async (req, res) => {
    const updatedExperience = await experience.findOneAndUpdate({
      _userId: req.params.userId,
      _resume_id: req.params.resumeId,
      _id: req.params.experienceId}, 
      {$set: req.body}, 
      {'new': true}
    ).catch(err => console.log(err));
    console.log(updatedExperience);
    res.status(201).send(updatedExperience);
  });

// Delete one experience from a resume
app.delete('/portal/:userId/resumes/:resumeId/experience/:experienceId', async (req, res) => {
  const experienceResponse = await experience.findOneAndDelete({
    _userId: req.params.userId,
    _resumeId: req.params.resumeId,
    _id: req.params.experienceId
    }).catch(err => console.log(error));
  res.status(200).send(experienceResponse);
});

// Delete all experiences from a resume
app.delete('/portal/:userId/resumes/:resumeId/experience', async (req, res) => {
  const deletedExperiences = await experience.deleteMany({
    _userId: req.params.userId,
    _resumeId: req.params.resumeId
  }).catch(error => console.log(error));
  res.status(201).send(deletedExperiences);
  });

app.listen(3000, () => {
    console.log('Server starter on port 3000');
});
