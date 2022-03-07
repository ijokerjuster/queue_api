const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT  = passportJWT.ExtractJwt;
const userService = require('../services/user.service');
const { secret } = require('./app');

module.exports = () => {
  passport.use(new LocalStrategy(async(username, password, done) => {
    try {
      const user = await userService.login({username, password});
      return done(null,user);
    } catch (error) {
      return done(error);
    }
  }));

  const fromCookieAndAuthHeaderAsBearerToken = req => {
    if (req && req.cookies) {
        return req.cookies['token']
    }
    return ExtractJWT.fromAuthHeaderAsBearerToken();
} 

  passport.use(new JWTStrategy({
    jwtFromRequest: fromCookieAndAuthHeaderAsBearerToken,
    secretOrKey: secret,
  }, async(jwtPayload, done) => {
    try {
      const user = await userService.getById(jwtPayload.id);
      return done(null,user);
    } catch (error) {
      return done(error);
    }
  }));
};
