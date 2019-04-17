const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./enrollController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');
const enrollMiddleware = require('../../middleware/enrollMiddleware');

const processEnroll = [
    enrollMiddleware.verifyCourse
];

router.route('/courses/:courseId')
.post(checkUser, validator.validateEnrollParam, processEnroll, controller.postCourseEnroll);

module.exports = router;
