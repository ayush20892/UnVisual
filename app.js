const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();

const cookieParser = require("cookie-parser");

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://unvisual.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const homeRoute = require("./server/routes/homeRoute");
const userRoute = require("./server/routes/userRoute");
const videoRoute = require("./server/routes/videoRoute");

app.use("/api/v1", homeRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", videoRoute);

module.exports = app;
