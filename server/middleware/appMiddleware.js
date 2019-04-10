const bodyParser = require('body-parser');
const helmet = require('helmet');

//setup global middleware
module.exports =  (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
};