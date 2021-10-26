const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const blockUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.blocked = !user.blocked;
  await user.save();
  return res.status(200).json({
    success: true,
    data: "successfull",
  });
});

const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  await user.remove(id);

  return res.status(200).json({
    success: true,
    message: "Delete operation succeed",
  });
});
module.exports = {
  blockUser,
  deleteUser,
};
