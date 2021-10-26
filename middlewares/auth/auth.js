const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Question = require("../../models/Question");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/auth/tokenManager");

const getAccessToRoute = (req, res, next) => {
  //burada başlıyor kod
  if (!isTokenIncluded(req)) {
    //401 unauth 403 forbidden
    //burada bir hata varsa nexxt ile tamamiyle kod yapısını bitir diyoruz
    //yani abc yada abc1 e hiç girme
    //bu nexti error olmadan da kullanabilirzi
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
    //örnek burada ki gibi
    //burada mesela bütün işlemi yaptım ben req.usere ben kayıt ettim next ile bir sonraki middleware geç demek
    //burada çıkıp bundan sonraki yazılımış middlware geçecek , yani abc ye
    next();
  });
};
const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return next(new CustomError("Only admins  can access to this route", 403));
  }
  next();
});

const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;
  const question = await Question.findById(questionId);
  if (question.user != userId) {
    return next(new CustomError("you are not allowed to edit "));
  }
  next();
});
module.exports = { getAccessToRoute, getAdminAccess, getQuestionOwnerAccess };
