const sendJwtToClient = (user, response) => {
  const token = user.generateJwtFromUser();
  const { JWT_COOKIE, NODE_ENV } = process.env;
  //bu token kayıt olayını senin tarafında yapma, hatırlarsan bir token dönderiyoruz front içind
  //bunu frontend tarafı yapması lazım
  //burada sen direkt olarak cookie kayıt ediyorsun , bazı durumlarda bu da saptıyor
  //burada direkt tokenı dönderebilirsin 
  return response
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV == "development" ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};
const isTokenIncluded = (req) => {
  //bahsedilen durum bu  bak, sallıyrum sana client tarafında bir istek geldi
  //burada fonskyion bazen çalışmıyor, cookie bulamıyor
  //kullanıcı o an herhangi bir blcok kullanıyorsa hiçbir işlem yapamazsın

  //normalde burada yapacağın kontrol sadece sana headerden gelecek olan tokenı çözmek(verify) ve zamanına bakmak
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};
const getAccessTokenFromHeader = (req) => {
  const auth = req.headers.authorization;
  const access_token = auth.split(" ")[1];
  return access_token;
};
module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };
