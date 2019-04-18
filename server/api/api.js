const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/courses', require('./course/courseRoutes'));
router.use('/enrolls', require('./enroll/enrollRoutes'));
router.use('/payments', require('./payment/paymentRoutes'));

module.exports = router;