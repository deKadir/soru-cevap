const getAllQuestions = (req, res, next) => {
  //res gönderdiğin her yerde return yaz başına
  //return yazma sebebin direkt o fonksiyonu kapat anlamına geliyor
  return res.status(200).json({
    success: true,
  });
  //sallıyorum aşağısında bir tane daha res var onu da okur, return dersen başka kod okumaz
};

module.exports = {
  getAllQuestions,
};
