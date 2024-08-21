const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 2000;
const app = express();
const cors = require("cors");
const userRoute = require('./routes/userRoute')
const conversationRoute = require('./routes/conversationRoute')
const messageRoute = require('./routes/messageRoute')
const cookieParser = require("cookie-parser");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173",
      "ws://localhost:8900"
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/", userRoute);
app.use("/", conversationRoute);
app.use("/", messageRoute);

mongoose
  .connect("mongodb://127.0.0.1:27017/messanger", {})
  .then(() => console.log("Database Connection Success!"));

app.listen(port, () => {
  console.log("Server is running in port "+ port);
});
