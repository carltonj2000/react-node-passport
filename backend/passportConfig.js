const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const User = require("./user");

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) return done(null, false);
        bcrypt
          .compare(password, user.password)
          .then((pwMatch) => {
            if (pwMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch((e) => {
            throw e;
          });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
