const express = require("express");
const router = express.Router();
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelper");
const {
  getAdminAccess,
  getAccessToRoute,
} = require("../middlewares/auth/auth");
const { blockUser, deleteUser } = require("../controller/admin");
router.use([getAccessToRoute, getAdminAccess]);
router.get("/block/:id", checkUserExist, blockUser);
router.delete("/user/delete/:id", checkUserExist, deleteUser);

module.exports = router;
