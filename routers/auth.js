const express = require("express");
const { register } = require("../controller/auth");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Auth homepage");
});

router.post("/register", register);
module.exports = router;
