const express = require("express");
const { register, errorTest } = require("../controller/auth");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Auth homepage");
});

router.get("/register", register);
router.get("/error", errorTest);
module.exports = router;
