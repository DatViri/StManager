const error = require('../util/error');
const mongoose = require('mongoose');

exports.validateUserParam = (req, res, next) => {
  req.checkBody('username', 'Username should not be empty').notEmpty();
  req.checkBody('password', 'Password should not be empty').notEmpty();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('phoneNumber', 'Invalid phone number').notEmpty().
      isLength({min: 10, max: 10});
  req.checkBody('age','Invalid age').notEmpty().
      isLength({min:1, max:2});
  req.checkBody('school','School should not be empty').notEmpty();


  const errors = req.validationErrors();
  if (errors) {
    switch (errors[0].param) {
      case 'username':
        next(error.badRequestError(errors[0].msg, 6));
      case 'password':
        next(error.badRequestError(errors[0].msg, 7));
      case 'email':
        next(error.badRequestError(errors[0].msg, 8));
      case 'phoneNumber':
        next(error.badRequestError(errors[0].msg, 9));
      case 'age':
        next(error.badRequestError(errors[0].msg, 10));
      case 'school':
        next(error.badRequestError(errors[0].msg, 11));
    }
  }
  next();
};

exports.validateUpdateUserParam = (req, res, next) => {
  if (req.body.phoneNumber) {
    req.checkBody('phoneNumber', 'Invalid phone number').
        isLength({min: 10, max: 10});
  }
  if (req.body.age) {
    req.checkBody('age', 'Invalid age').
        isLength({min: 1, max: 2});
  }

  const errors = req.validationErrors();
  if (errors) {
    next(error.badRequestError(errors[0].msg, 9));
  }
  next();
};
