const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./enrollController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');
const enrollMiddleware = require('../../middleware/enrollMiddleware');

router.route('/courses/:courseId')
.post(checkUser, validator.validateEnrollParam, enrollMiddleware.verifyCourse, controller.postCourseEnroll)
.get(enrollMiddleware.verifyCourse, controller.getUsersOfCourse);

router.route('/users/:userId')
.get(enrollMiddleware.verifyUser, controller.getCoursesOfUser);

router.route('/:id')
.get(controller.getOneEnroll)
.delete(controller.delete);

module.exports = router;
