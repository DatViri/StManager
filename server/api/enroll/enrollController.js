const Enroll = require('./enrollModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.postCourseEnroll = (req, res, next) => {
  const newEnroll = {};
  const userArray = [];
  userArray.push(req.user._id);
  newEnroll.course = req.course._id;
  newEnroll.userEnroll = userArray;

  Enroll.create(newEnroll)
  .then((enroll) => {
    res.json(responseHandler.successResponse(enroll));
  })
  .catch(err => {
    console.log(err);
    next(error.internalServerError());
  });
};