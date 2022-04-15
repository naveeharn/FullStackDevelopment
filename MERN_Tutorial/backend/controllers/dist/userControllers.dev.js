"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var asyncHandler = require('express-async-handler');

var User = require('../models/userModel'); // @desc    Register new user
// @route   POST /api/users
// @access  Public


var registerUser = asyncHandler(function _callee(req, res) {
  var _req$body, name, email, password, userExists, salt, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

          if (!(!name || !email || !password)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error('Please add all fileds');

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 9;
            break;
          }

          throw new Error('User already exists');

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 11:
          salt = _context.sent;
          console.log(salt);
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 15:
          hashedPassword = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hashedPassword
          }));

        case 18:
          user = _context.sent;

          if (!user) {
            _context.next = 23;
            break;
          }

          res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
          });
          _context.next = 25;
          break;

        case 23:
          res.status(400);
          throw new Error('Invalid user data');

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

var loginUser = asyncHandler(function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.json({
            message: 'Login User'
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    Get user data
// @route   GET /api/users/my_user
// @access  Public

var getMe = asyncHandler(function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.json({
            message: 'My User Data'
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getMe: getMe
};