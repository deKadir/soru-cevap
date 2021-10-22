const express = require("express");

const app = express();
const PORT = 5000 | process.env.PORT;
app.get("/", (req, res) => {
  res.send("welcome to question answer app");
});
app.listen(PORT, () => {
  console.log(`App started on: ${PORT}`);
});
