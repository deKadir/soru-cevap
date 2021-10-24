const bcyrpt = require("bcryptjs");
const validateUserInput = (email, password) => {
  //bunlara pek takılma ya, orada da direkt kontrole debilirsin
  //email ve passwordu başka bir yerde kontrol etmeyeceksin sonuçta
  return email && password;
};
const comparePasswords = (password, hashPassword) => {
  return bcyrpt.compareSync(password, hashPassword);
};
module.exports = { validateUserInput, comparePasswords };
