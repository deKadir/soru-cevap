const multer = require("multer");
const path = require("path");
const CustomError = Require("../../helpers/error/CustomError.js");

const storage = multer.storage({
  destination: function (req, file, cb) {},
});
