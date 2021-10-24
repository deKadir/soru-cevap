const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const { validateUserInput, comparePasswords } = require("../input/inputHelper");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/auth/tokenManager");
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendJwtToClient(user, res);
});
const getuser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};
const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("please provide email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!comparePasswords(password, user.password)) {
    return next(new CustomError("password is incorrect"), 400);
  }
  sendJwtToClient(user, res);
});
const logout = asyncErrorWrapper(async (req, res, next) => {
  const { JWT_COOKIE, NODE_ENV } = process.env;
  return res.status(200).cookie({
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: NODE_ENV == "development" ? false : true,
  });
});
module.exports = {
  register,
  getuser,
  login,
  logout,
};
