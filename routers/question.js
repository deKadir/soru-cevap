const express = require("express");
const { getAllQuestions } = require("../controller/question");
const router = express.Router();
router.get("/", getAllQuestions);

router.get("/delete", (req, res) => {
  res.send("Auth delete page");
});

module.exports = router;
