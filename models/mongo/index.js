const mongoose = require('mongoose');
const config = require('../../config/default.json');

const mongodbUrl = config.mongodb.url;

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl, function (err) {
  if (err) {
    console.error('connect to %s error: ', mongodbUrl, err.message);
    process.exit(1);
  }
});

const User = require('./user');

module.exports = {
    User
};