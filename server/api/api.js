const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/courses', require('./course/courseRoutes'))

module.exports = router;