const Course = require('../api/course/courseModel');
const User = require('../api/user/userModel');
const error = require('../util/error');

exports.verifyCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  console.log(courseId);
  Course.findById(courseId).exec().then((course) => {
      req.course = course;
      next();

  }, (err) => {
    next(error.notFoundError('Cannot find course with that id', 1));
  });
};
