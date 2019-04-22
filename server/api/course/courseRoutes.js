const router = require('express').Router();
const controller = require('./courseController');

router.param('id', controller.params);

router.route('/')
.get(controller.get)
.post(controller.post);

router.route('/filter')
.get(controller.getCourseFilter);

router.route('/:id')
.get(controller.getOne)
.put(controller.put)
.delete(controller.delete);

module.exports = router;
