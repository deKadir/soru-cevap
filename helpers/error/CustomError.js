class CustomError extends Error {
  //bu normal şartlarda çok doğru bir şey değil,
  //fonksiyonel bir dil kullandığımız için direkt bir fonksiyon ile de yazabilirisn 
  //örnek
  // const returnAccesRes=(res,value)=>{
  //   return res.status(200).json({message:value})
  // }  
  //kullanımı 
  //return returnAccesRes(res,"register işlemi başarılı")
  //returnu burada vermen lazım ki ,js asenktron çalıştığı için aşağıdaki kodlara inmesin
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = CustomError;
