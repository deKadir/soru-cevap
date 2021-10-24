const express = require("express");
const {
  register,
  getuser,
  login,
  forgotPassword,
  logout,
  imageUpload,
} = require("../controller/auth");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/auth/auth");
router.get("/", (req, res) => {
  res.send("Auth homepage");
});

const profileImageUpload = require("../middlewares/libraries/profileImageUpload");
//bak şimdi burada getAccessToRoute bir middleware
//bu şekilde array içerisine de alabilirsin bunun yanında başka bir middware de olabilir
//gibi gibi

//neti kullanma sebebiimiz gettaccestoroute kısmına kullanıcı dan gelen istekli ilk olarak giriş yapıyor kod
//abc içerisinde de iişlemin bittikten sonra abc2 ye geç demen için next kullanman lazım
// herhangi bir hata durumunda da next kullanabilirisn

//middlewarein olayı şu demek
//bir bakıma daha az kod yazmak ve bir route içerisinde katmanlar oluşturmak demektir

//örnek olarak getaccesstoroute ben bir middleware yazdım
//bu middlewarein işlemi tokenı alıyor verify ediyor ve req.user olarak kayıt ediyor yani bir sonraki middleware de
//usera ulaşmanı sağlıyır

//bambaşka işlemerde yapabilirsin middleware ile
//örnek
//bir kayıt yaparsın , bu kaydı var mı yok mu diye bir önceki middleware ile kontrol eedersin

router.get("/getuser", [getAccessToRoute], getuser);

//sallıyorum ben register işleminde bir kayıt yapacağım ama emaili db tarafında değilde kendim kontrol etmek istiyorum
//middleware ile

//controlEmail adında bir middleware yazarım , bu fonksiyon gelen data içerisinde ki email benim dbmde var mı diye kontrol etisn

// const controlEmail=(req,res,next)=>{
//     //bla bla kodlar kontrolü yapıyorsun
//     //bu email varsa ben bir sonraki middle ware yani asıl kayıt yapmak istediğim yere gitmesini istemiyorum
//     return res.status(400).json({message:"bu kayıt var"})
//     // diye çıkartabilirisn bunu next ile de yapabilirisn ama genel hatlarıylra res ile çıkartmaya çalış
//     //tamam işimiz bitti bu kayıtta bir kullanıcımız yok
//     //bu kodu bitirip diğer middleware yani asıl create yaptığımız register buraya geçmesini istiyorum
//     //bu sefer next() ile orata gönderiyorum ki ben kontrolü yaptım sen kayıt edebilirsin demek
// }
router.post("/register", register);

router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/forgotpassword", forgotPassword);
module.exports = router;
