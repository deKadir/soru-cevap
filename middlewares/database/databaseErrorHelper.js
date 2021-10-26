const User = require("../../models/User");
const Question = require("../../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError("User not found"), 404);
  }
  // req.data = user;
  next();
});
const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const id = req.params.id || req.params.question_id;
  const question = await Question.findById(id);
  if (!question) {
    return next(new CustomError("question not found", 404));
  }
  next();
});

module.exports = { checkUserExist, checkQuestionExist };
