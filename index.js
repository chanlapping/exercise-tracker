require('express-async-errors');

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');

connectDB(process.env.MONGO_URI).catch(err => console.log(err));

const usersRouter = require('./routes/users');

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.urlencoded({ extended: false }));



app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
