const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
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

module.exports = { getAccessToRoute };
