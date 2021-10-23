const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("connection succeed");
    })
    .catch((err) => console.log(err));
};
module.exports = connectDatabase;
