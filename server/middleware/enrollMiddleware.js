const Course = require('../api/course/courseModel');
const User = require('../api/user/userModel');
const error = require('../util/error');

exports.verifyCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  Course.findById(courseId).exec().then((course) => {
      req.course = course;
      next();

  }, (err) => {
    next(error.notFoundError('Cannot find course with that id', 1));
  });
};

exports.verifyUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId).exec().then((user) => {
    req.user = user;
    next();

  }, (err) => {
    next(error.notFoundError('Cannot find user with that id', 1));
  });
};
