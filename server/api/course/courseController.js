const Course = require('./courseModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.params = (req, res, next, id) => {
  Course.findById(id).
      select().
      exec().then((course) => {
    if (!course) {
      next(error.notFoundError('Cannot find course with that id', 1));
    } else {
      req.course = course;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find course with that id', 1));
  });
};

exports.get = (req, res, next) => {
  Course.find({}).
      sort({time: -1}).
      exec().
      then((courses) => {
        res.json(responseHandler.successResponse(courses));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.getCourseFilter = (req, res, next) => {
  let filter = {};
  const category = req.query.category;
  if (category) {
    filter = _.merge(filter, {category: category});
  }

  const price = req.query.price;
  if (price) {
    filter = _.merge(filter, {price: price});
  }

  Course.find(filter).exec().then((courses) => {
    res.json(responseHandler.successResponse(courses));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.getOne = (req, res, next) => {
  const course = req.course;
  res.json(responseHandler.successResponse(course));
};

exports.put = (req, res, next) => {

  const course = req.course;
  const update = req.body;

  _.merge(course, update);
  course.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(responseHandler.successResponse(saved));
    }
  });
};

exports.post = (req, res, next) => {
  const newCourse = req.body;

  Course.create(newCourse).then((course) => {
    res.json(responseHandler.successResponse(course));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.delete = (req, res, next) => {

  req.course.remove((err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse(removed));
    }
  });
};