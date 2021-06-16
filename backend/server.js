const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");

const User = require("./user");

const app = express();
mongoose
  .connect("mongodb://localhost:27017/rnp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "session encryption secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({
      register: "Failed",
      reason: "provide both username and password",
    });
  }
  const userAlready = await User.findOne({ username });
  if (userAlready) {
    return res.send({ register: "Failed", reason: "user already registered" });
  }
  const pwHash = await bcrypt.hash(password, 12);
  const userNew = new User({ username, password: pwHash });
  const user = await userNew.save();
  res.send({ register: "OK", user });
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send({ login: "Failed", reason: "No registered user found" });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ login: "OK", user });
      });
    }
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send({ logout: "OK" });
});
app.get("/user", (req, res) => {
  res.send({ user: "OK", ...req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));
