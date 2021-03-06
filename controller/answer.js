const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const user_id = req.user.id;
  const info = req.body;
  const answer = await Answer.create({
    ...info,
    question: question_id,
    user: user_id,
  });
  return res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = { addNewAnswerToQuestion };
