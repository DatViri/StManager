const bodyParser = require('body-parser');
const helmet = require('helmet');
const validator = require('express-validator');


//setup global middleware
module.exports =  (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(validator());
};