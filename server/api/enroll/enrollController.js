const Enroll = require('./enrollModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.postCourseEnroll = (req, res, next) => {
  const newEnroll = {};
  newEnroll.courseId = req.course._id;
  newEnroll.userId = req.user._id;

  Enroll.create(newEnroll)
  .then((enroll) => {
    res.json(responseHandler.successResponse(enroll));
  })
  .catch(err => {
    console.log(err);
    next(error.internalServerError());
  });
};