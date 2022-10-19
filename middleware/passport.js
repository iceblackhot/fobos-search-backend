const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const db = require('./../settings/db');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      try {
        db.query(
          "SELECT `id`, `email` FROM `users` WHERE `id` = '" + payload.userId + "'",
          (error, rows, fields) => {
            if (error) {
              console.log(error);
            } else {
              const user = rows;
              if (user) {
                done(null, user);
              } else {
                done(null, false);
              }
            }
          },
        );
      } catch (error) {
        console.log(error);
      }
    }),
  );
};
