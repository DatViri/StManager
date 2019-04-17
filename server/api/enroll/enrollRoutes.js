const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./enrollController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');
const enrollMiddleware = require('../../middleware/enrollMiddleware');

router.route('/courses/:courseId')
.post(checkUser, validator.validateEnrollParam, enrollMiddleware.verifyCourse, controller.postCourseEnroll);

module.exports = router;
