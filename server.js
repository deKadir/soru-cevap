const express = require("express");
const connectionDatabase = require("./helpers/database/connectdb");
const app = express();
const routes = require("./routers/index.js");
const customErrorHandler = require("./middlewares/Errors/customErrorHandler");
//Environmental Variables
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env",
});
const PORT = process.env.PORT;
//connect db
connectionDatabase();

app.use("/api", routes);

//Error hanlde
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`App started on: ${PORT} ${process.env.NODE_ENV} mode`);
});
