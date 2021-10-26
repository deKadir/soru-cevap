const express = require("express");
const { getAccessToRoute } = require("../middlewares/auth/auth");
const { addNewAnswerToQuestion } = require("../controller/answer");
const router = express.Router({ mergeParams: true });
router.post("/", getAccessToRoute, addNewAnswerToQuestion);
module.exports = router;
