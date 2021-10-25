const express = require("express");
const router = express.Router();
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelper");
const { getSingleUser, getAllUsers } = require("../controller/user");

router.get("/:id", checkUserExist, getSingleUser);
router.get("/", getAllUsers);
module.exports = router;
