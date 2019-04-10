const express = require('express');
const app = express();
const api = require('./api/api');
const error = require('./util/error');
const responseHandler = require('./util/responseHandler');
const mongoose = require('mongoose');
const config = require('./config/config');
const auth = require('./auth/authRoutes');


//setup the app middleware
require('./middleware/appMiddleware')(app);
app.use(express.static('public'));

//connect to mongoDB
mongoose.connect(config.db).then(() => {
  console.log('Connected successfully');
}).catch((err) => {
  console.log('Cannot connect to database', err);
});

//setup the api
app.use('/api/', api);
app.use('/auth/', auth);

//handle error
app.use((err, req, res, next) => {
  if (!(err instanceof error.APIError)) {
    console.log(err);
    const apiError = error.apiError(err.message || err.msg, err.status, err.code);
    console.log(apiError);
    next(apiError);
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).json(responseHandler.failureResponse(
      err.status,
      err.message,
      err.code
  ));
});

//export the app for testing
module.exports = app;