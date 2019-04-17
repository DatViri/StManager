const Enroll = require('./enrollModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.postCourseEnroll = (req, res, next) => {
  const newEnroll = {};
  newEnroll.courseId = req.course._id;
  newEnroll.userId = req.user._id;

  Enroll.create(newEnroll)
  .then((courseEnroll) => {
    res.json(responseHandler.successResponse(courseEnroll));
  })
  .catch(err => {
    console.log(err);
    next(error.internalServerError());
  });
};

exports.getOneEnroll = (req, res, next) => {
  Enroll.findById(req.params.id).
      populate('userId', '_id username phoneNumber email school age').
      populate('courseId', 'courseName description price category time imgPath').
      exec().
      then((courseEnroll) => {
        res.json(responseHandler.successResponse(courseEnroll));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.getUsersOfCourse = (req, res, next) => {
  console.log(req.courseId);
  Enroll.find({courseId: req.params.courseId}).
      populate('userId', '-password').
      exec().
      then((courseEnrolls) => {

        const users = courseEnrolls.map(courseEnroll => courseEnroll.userId)
        res.json(responseHandler.successResponse(users));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.getCoursesOfUser = (req, res, next) => {
  console.log(req.userId);
  Enroll.find({userId: req.params.userId}).
      populate('courseId').
      exec().
      then((courseEnrolls) => {

        const courses = courseEnrolls.map(courseEnroll => courseEnroll.courseId);
        res.json(responseHandler.successResponse(courses));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.delete = (req, res, next) => {

  const id = req.params.id;
  Enroll.remove({'_id': id},(err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse(removed));
    }
  });
};