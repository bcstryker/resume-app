const mongoose = require('mongoose');
Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/resume-app')
    .then(() => console.log('DB connected successfully!'))
    .catch((error) => console.log('Error occurred while connecting to DB', error));

module.exports = mongoose;