const express = require("express");
const question = require("./question.js");
const user = require("./user");
const auth = require("./auth");
const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
module.exports = router;
