const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  })
}

exports.signUp = catchAsync(async (req, res) => {
  const {
    name,
    email,
    password,
    passwordConfirm
  } = req.body;

  const newUser = await User.create({ name, email, password, passwordConfirm });

  createSendToken(newUser, 201, req, res);
})

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Please provide an email and a password", 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, 'Incorrect email or password.'))
  }

  createSendToken(user, 200, req, res);
})

exports.signOut = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  
  res.status(200).json({ status: 'success' });
}