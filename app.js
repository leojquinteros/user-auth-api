const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const index = require('./server/routes/index');

const app = express();

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database.mongodbEndpoint, {
  useMongoClient: true,
  promiseLibrary: global.Promise
}).then(() => { 
    console.log(`Connected to MongoDB at: ${new Date()}`) 
  },
  err => { 
    console.error.bind(console, 'Connection error:') 
  }
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);

module.exports = app;