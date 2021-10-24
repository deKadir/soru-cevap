const express = require("express");
const { register, getuser, login, logout } = require("../controller/auth");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/auth/auth");
router.get("/", (req, res) => {
  res.send("Auth homepage");
});
router.get("/getuser", getAccessToRoute, getuser);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
module.exports = router;
