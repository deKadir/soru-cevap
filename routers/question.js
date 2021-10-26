const express = require("express");
const answer = require("./answer");
const {
  askNewQuestion,
  getAllQuestions,
  editQuestion,
  getQuestion,
} = require("../controller/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelper");
const router = express.Router();
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/auth/auth");
router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/question/:id", checkQuestionExist, getQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.use("/:question_id/answers", checkQuestionExist, answer);
module.exports = router;
