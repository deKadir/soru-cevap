const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  if (err.name == "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name == "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if (err.code == "11000") {
    customError = new CustomError(err.errors, 400);
    console.log(err.message);
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "internal server error",
  });
};
module.exports = customErrorHandler;
