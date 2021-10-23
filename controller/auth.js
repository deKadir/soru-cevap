const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const register = async (req, res, next) => {
  const name = "kadir";
  const email = "kadir123@gmail.com";
  const password = "12345";
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
const errorTest = (req, res, next) => {
  return next(new SyntaxError("Sysntax error"));
};
module.exports = {
  register,
  errorTest,
};
