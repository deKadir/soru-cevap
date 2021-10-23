const express = require("express");
const question = require("./question.js");
const auth = require("./auth");
const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);

module.exports = router;
