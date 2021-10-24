const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/auth/tokenManager");

const getAccessToRoute = (req, res, next) => {
  if (!isTokenIncluded(req)) {
    //401 unauth 403 forbidden
    return next(new CustomError("You are not authorized", 401));
  }
  const access_token = getAccessTokenFromHeader(req);
  const { JWT_SECRET } = process.env;
  jwt.verify(access_token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new CustomError("You are not authorized", 401));
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  });
};

module.exports = { getAccessToRoute };
