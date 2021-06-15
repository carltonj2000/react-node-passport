const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(
  session({
    secret: "session encryption secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.post("/register", (req, res) => {
  console.log(req.body);
  res.send({ register: "OK" });
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.send({ login: "OK" });
});
app.post("/logout", (req, res) => {
  console.log(req.body);
  res.send({ logout: "OK" });
});
app.get("/user", (req, res) => {
  console.log(req.body);
  res.send({ user: "OK" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));
